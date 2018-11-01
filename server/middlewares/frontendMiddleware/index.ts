import { Application } from 'express';

import { EMPTY_OBJECT } from '../../utils';
import { IMiddlewareOptions } from '../types';

/**
 * Front-end middleware
 */
export default function frontendMiddleware(
  app: Application,
  options: IMiddlewareOptions = EMPTY_OBJECT,
): Application {
  const isProd: boolean = process.env.NODE_ENV === 'production';

  if (isProd) {
    const addProdMiddleware = require('./addProdMiddleware').default;
    addProdMiddleware(app, options);
  } else {
    const addDevMiddleware = require('./addDevMiddleware').default;
    addDevMiddleware(app, options);
  }

  return app;
}
