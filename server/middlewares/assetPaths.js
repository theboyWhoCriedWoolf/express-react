// @flow
import path from 'path';
import express, { type $Application } from 'express';

import { EMPTY_OBJECT } from '../utils';
import config from '../../config';

export default function publicPaths(app: $Application, options?: Object = EMPTY_OBJECT) {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build/client');

  app.use(
    publicPath,
    express.static(outputPath, {
      maxAge: config.get('browserCacheMaxAge'),
    }),
  );
}
