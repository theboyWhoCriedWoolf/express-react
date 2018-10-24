// @flow
import express, { type Router } from 'express';

import getController from './get.controller';

const router: Router = express.Router();

// route paths
const paths: { [string]: string } = {
  index: '/healthcheck',
};

export default function healthecheckRoutes() {
  // get healthcheck
  router.get(paths.index, getController);

  // return Router
  return router;
}
