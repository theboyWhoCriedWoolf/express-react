// @flow
import path from 'path';
import chalk from 'chalk';
import asyncHandler from 'express-async-handler';
import proxy from 'http-proxy-middleware';
import type { $Application } from 'express';

import { log } from '../utils';
import config from '../../config';

type Options = {
  outputPath?: string,
};

function addDevMiddleware(app: $Application) {
  const origin = '/';
  const target = `http://${config.get('host')}:${config.get('clientDevServerPort')}`;

  log.info(`Proxy created [ ${chalk.cyan(origin)} ] -> ${chalk.cyan(target)}`);

  app.use(
    proxy(origin, {
      target,
      logLevel: 'error',
      ws: true,
      changeOrigin: true,
    }),
  );
}

function addProdMiddleware(app: $Application, options: Options) {
  const outputPath: string = options.outputPath || path.resolve(process.cwd(), 'build');
  app.get(
    '*',
    asyncHandler(
      async (req, res): Promise<void> =>
        res.status(200).sendFile(path.resolve(outputPath, 'index.html')),
    ),
  );
}

/**
 * Front-end middleware
 */
export default function frontendMiddleware(app: $Application, options: Options): $Application {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    addProdMiddleware(app, options);
  } else {
    addDevMiddleware(app);
  }

  return app;
}
