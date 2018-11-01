import * as express from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import chalk from 'chalk';

import { EMPTY_OBJECT } from '../utils';
import { ICertOptions, ICreateServer } from './types';

export default function createServer(
  app: express.Application,
  { serverKey, serverCert, clientCert }: ICertOptions = EMPTY_OBJECT,
): ICreateServer {
  // create cert configuration
  const certs: https.ServerOptions = {
    key: safeAdd(serverKey),
    cert: safeAdd(serverCert),
    ca: safeAdd(clientCert),
    requestCert: false,
    rejectUnauthorized: false,
  };

  if (certs.key && certs.cert) {
    certs.requestCert = Boolean(certs.ca);
    certs.rejectUnauthorized = Boolean(certs.ca);

    // tslint:disable-next-line:no-console
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

function safeAdd(path: string = ''): string | undefined {
  try {
    // tslint:disable-next-line:tsr-detect-non-literal-fs-filename
    return fs.existsSync(path) ? String(fs.readFileSync(path)) : undefined;
  } catch (error) {
    // throw error if something went wrong
    throw new Error(error);
  }
}
