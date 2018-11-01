import proxy from 'http-proxy-middleware';
import chalk from 'chalk';
import { Application } from 'express';

import { log } from '../../utils';
import config from '../../../config';

export default function addDevMiddleware(app: Application) {
  const origin: string = '/';
  const target: string = `http://${config.get('host')}:${config.get('clientDevServerPort')}`;

  log.info(`Proxy created [ ${chalk.cyan(origin)} ] -> ${chalk.cyan(target)}`);
  app.use(proxy(origin, { target, logLevel: 'error', ws: true, changeOrigin: true }));
}
