import * as path from 'path';
import * as express from 'express';

import { EMPTY_OBJECT } from '../utils';
import config from '../../config';

import { IMiddlewareOptions } from './types';

export default function publicPaths(
  app: express.Application,
  options: IMiddlewareOptions = EMPTY_OBJECT,
) {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build/client');

  app.use(
    publicPath,
    express.static(outputPath, {
      maxAge: config.get('browserCacheMaxAge'),
    }),
  );
}
