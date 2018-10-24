// @flow
import express, { type $Application } from 'express';

import config from '../config';
import createServer from './createServer';
import bootstrap from './bootstrap';
import { log, prettyError, appStarted, normalizePort } from './utils';

// error handling code
['uncaughtException', 'unhandledRejection'].forEach(sig => {
  process.on(sig, error => {
    log.error(`${sig}: $ ${prettyError.render(error)}`);
    process.exit(1);
  });
});

async function start() {
  const app: $Application = express();
  const port: number = normalizePort(config.get('port'));
  const host: string = config.get('host');

  bootstrap(app, {
    outputPath: config.get('bundles.client.outputPath'),
    publicPath: config.get('bundles.client.webPath'),
  });

  const { server, https } = createServer(app, config.get('slCertificates'));

  // Start your app.
  // eslint-disable-next-line consistent-return
  server.listen(port, host, async err => {
    if (err) {
      return log.error(err.message);
    }

    log.info(appStarted(port, host, https));
  });
}

start().catch(err => log.error(prettyError.render(err)));
