import * as express from 'express';

import getController from './get.controller';

const router = express.Router();
// route paths
const paths: { [key: string]: string } = {
  index: '/healthcheck',
};

export default function healthecheckRoutes(): express.Router {
  // get healthcheck
  router.get(paths.index, getController);

  // return Router
  return router;
}
