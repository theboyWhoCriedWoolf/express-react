// @flow

import type { $Application } from 'express';
import initialiseGlobalMiddleware from './middlewares';
import initialiseRoutes from './routes';
import initialiseFrontEnd from './middlewares/frontendMiddleware';
import initialiseGlobalErrorMiddleware from './middlewares/errorHandlers';
import initialisePublicPaths from './middlewares/assetPaths';
import { EMPTY_OBJECT } from './utils';

export default function bootStrap(app: $Application, options?: Object = EMPTY_OBJECT) {
  // Don't expose any software information to potential hackers.
  app.disable('x-powered-by');

  initialisePublicPaths(app, options);
  initialiseGlobalMiddleware(app);
  initialiseRoutes(app);
  initialiseFrontEnd(app, options);

  // add error handling
  // added last to catch any errors in middleware
  // thats not handled
  app.use(...initialiseGlobalErrorMiddleware);

  return app;
}
