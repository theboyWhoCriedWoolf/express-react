// @flow
import type { $Application } from 'express';

import apiRoutes from './api';
import healthCheck from './healthcheck';

export default (app: $Application) => {
  app.use('/api', apiRoutes(app));
  app.use(healthCheck());
};
