// @flow

/* eslint security/detect-non-literal-fs-filename:0 no-console:0 */
import fs from 'fs';
import http from 'http';
import https from 'https';
import type { $Application } from 'express';
import chalk from 'chalk';

import type { ConnectOptions, Certificates, NodeServer } from './types';

export default function createServer(
  app: $Application,
  { serverKey, serverCert, clientCert }: Certificates = {},
): $ReadOnly<NodeServer> {
  // create cert configuration
  const certs: ConnectOptions = {
    key: safeAdd(serverKey),
    cert: safeAdd(serverCert),
    cs: safeAdd(clientCert),
  };

  if (certs.key && certs.cert) {
    certs.requestCert = Boolean(certs.cs);
    certs.rejectUnauthorized = Boolean(certs.cs);

    console.log(
      chalk.cyan(
        `Creating ${chalk.bold(' HTTPS ')} server. \n ${
          certs.rejectUnauthorized
            ? chalk.green('(Enabling, Mutual TLS enabled)')
            : chalk.bgYellow(
                `(Client certificate can't be found, Mutual TLS ${chalk.underline('Disabled')})`,
              )
        }`,
      ),
    );

    // return https
    return {
      server: https.createServer(certs, app),
      https: true,
    };
  }

  // return http
  return {
    server: http.createServer(app),
    https: false,
  };
}

function safeAdd(path?: string = ''): ?string {
  try {
    return fs.existsSync(path) ? String(fs.readFileSync(path)) : null;
  } catch (error) {
    // throw error if something went wrong
    throw new Error(error);
  }
}
