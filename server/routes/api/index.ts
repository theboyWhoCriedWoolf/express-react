import * as express from 'express';

import sampleEndpoint from './sampleEndpoint';

const router = express.Router();
const paths: { [key: string]: string } = {
  sampleEndpoint: '/sampleEndpoint',
};

export default function apiRoutes(app: express.Application): express.Router {
  // add sample end point
  // each API manages its own endpoints
  router.use(paths.sampleEndpoint, sampleEndpoint(app));

  return router;
}
