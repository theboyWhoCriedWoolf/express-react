// @flow
import express, { type $Application, Router } from 'express';

import sampleEndpoint from './sampleEndpoint';

const router: Router = express.Router();

const paths: { [string]: string } = {
  sampleEndpoint: '/sampleEndpoint',
};

export default function apiRoutes(app?: $Application) {
  router.use(paths.sampleEndpoint, sampleEndpoint(app));

  return router;
}
