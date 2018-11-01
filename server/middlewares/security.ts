import hpp from 'hpp';
import uuid from 'uuid';
import helmet from 'helmet';
import cookieSession from 'cookie-session';
import { Request, Response, NextFunction } from 'express';

import config from '../../config';
import { ICspOverrides, ICsp } from './types';

/**
 * configure csp
 */
const cspConfig: ICsp = {
  directives: {
    childSrc: ["'self'"],
    // IF you want to disable all external HTTP calls
    connectSrc: ['*'], // un-comment to disable all external calls ["'self'", 'ws:'],
    defaultSrc: ["'self'"],
    imgSrc: [
      "'self'",
      // is needed for use Base64 encoded images (i.e. inlined images), then you will
      'data:',
    ],
    fontSrc: ["'self'", 'data:'],
    objectSrc: ["'self'"],
    mediaSrc: ["'self'"],
    manifestSrc: ["'self'"],
    scriptSrc: [
      // Allow scripts hosted from our application.
      "'self'",
      // Note: We will execution of any inline scripts that have the following
      // nonce identifier attached to them.
      // This is useful for guarding your application whilst allowing an inline
      // script to do data store rehydration (redux/mobx/apollo) for example.
      // @see https://helmetjs.github.io/docs/csp/
      (req: Request, res: Response) => `'nonce-${res.locals.nonce}'`,
      // This is a know workaround for browsers that don't support nonces.
      // It will be ignored by browsers that do support nonces as they will
      // recognise that we have also provided a nonce configuration and
      // use the stricter rule.
      "'unsafe-inline'",
    ],
    styleSrc: [
      "'self'",
      // Webpack generates JS that loads our CSS, so this is needed:
      "'unsafe-inline'",
      'blob:',
    ],
  },
};

/* eslint-disable security/detect-object-injection */
// Add any additional CSP from the static config.
const cspExtensions: ICspOverrides = config.get('cspExtensions');
Object.keys(cspExtensions).forEach(key => {
  if (cspConfig.directives[key]) {
    cspConfig.directives[key] = (cspConfig.directives[key] as string[]).concat(cspExtensions[key]);
  } else {
    cspConfig.directives[key] = cspExtensions[key];
  }
});

/* eslint-enable security/detect-object-injection */

function nonceMiddleware(req: Request, res: Response, next: NextFunction) {
  // eslint-disable-next-line no-param-reassign
  res.locals.nonce = uuid.v4();
  next();
}

function secureCookies() {
  return cookieSession({
    secret: uuid.v4(),
    name: 'session',
    httpOnly: true,
    // keys: [
    //   /* secret keys */
    // ],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export default [
  nonceMiddleware,
  // Prevent HTTP Parameter pollution.
  hpp(),
  // The xssFilter middleware sets the X-XSS-Protection header to prevent
  // reflected XSS attacks.
  helmet.xssFilter(),
  // Frameguard mitigates clickjacking attacks by setting the X-Frame-Options header.
  helmet.frameguard({ action: 'DENY' }),
  // Sets the X-Download-Options to prevent Internet Explorer from executing
  // downloads in your site’s context.
  helmet.ieNoOpen(),
  helmet.noCache(),
  // Don’t Sniff Mimetype middleware, noSniff, helps prevent browsers from trying
  // to guess (“sniff”) the MIME type, which can have security implications. It
  // does this by setting the X-Content-Type-Options header to nosniff.
  helmet.noSniff(),
  // Content Security Policy
  //
  // If you are unfamiliar with CSPs please refer to:
  //  - https://content-security-policy.com/
  //  - https://developers.google.com/web/fundamentals/security/csp/
  //  - https://developer.mozilla.org/en/docs/Web/Security/CSP
  //  - https://helmetjs.github.io/docs/csp/
  //
  // If you are relying on scripts/styles/assets from other servers (internal
  // or external to your company) then you will need to explicitly configure
  // the CSP below to allow for this. You can do this in the config file
  helmet.contentSecurityPolicy(cspConfig),
  // add secure cookies middleware
  secureCookies(),
];
