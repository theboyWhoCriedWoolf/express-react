import * as express from 'express';

import getController from './get.controller';

const router = express.Router();
const paths: { [key: string]: string } = {
  index: '/:value',
};

export default function sampleEndpoint(app?: express.Application) {
  router.get(paths.index, getController);

  return router;
}
