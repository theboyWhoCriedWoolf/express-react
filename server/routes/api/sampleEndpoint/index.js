import express from 'express';

import getController from './get.controller';

const router = express.Router();

const paths = {
  index: '/:value',
};

export default function sampleEndpoint() {
  router.get(paths.index, getController);

  return router;
}
