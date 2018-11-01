import { Application } from 'express';
import apiRoutes from '../services/api';
import healthcheck from '../services/healthcheck';

export default (app: Application) => {
  app.use('/api', apiRoutes(app));
  app.use(healthcheck());
};
