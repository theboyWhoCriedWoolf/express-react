import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import logger from 'morgan';
import { Application } from 'express';

import security from './security';
import correlationMiddleware from './correlationIdMiddleware';

export default function middleware(app: Application) {
  // add development logging
  app.use(logger('dev'));

  // setup data parsing
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // enable cors
  app.use(cors());

  // add error handling
  app.use(...security);

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());

  app.use(correlationMiddleware);
}
