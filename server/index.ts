import express, { Application } from 'express';

import config from '../config';
import createServer from './createServer';
import bootstrap from './bootstrap';
import { log, prettyError, appStarted, normalizePort } from './utils';

// error handling code
['uncaughtException', 'unhandledRejection'].forEach((sig: any) => {
  process.on(sig, error => {
    log.error(`${sig}: $ ${prettyError.render(error)}`);
    process.exit(1);
  });
});

async function start() {
  const app: Application = express();
  const port: string | number = normalizePort(config.get('port')) || 3000;
  const host: any = config.get('host');

  bootstrap(app, {
    outputPath: config.get('bundles.client.outputPath'),
    publicPath: config.get('bundles.client.webPath'),
  });

  const { server, https } = createServer(app, config.get('slCertificates'));

  log.info('-------- ehllo world ');

  // Start your app.
  server.listen(port, host, async (err: Error) => {
    if (err) {
      return log.error(err.message);
    }

    log.info(appStarted(port, host, https));
  });
}

start().catch(err => log.error(prettyError.render(err)));
