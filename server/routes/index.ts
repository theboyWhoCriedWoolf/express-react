import { Application } from 'express';
import apiRoutes from './api';
import healthcheck from './healthcheck';

export default (app: Application) => {
  app.use('/api', apiRoutes(app));
  app.use(healthcheck());
};
