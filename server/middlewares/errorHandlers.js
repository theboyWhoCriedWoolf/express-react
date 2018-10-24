// @flow
import createError from 'http-errors';
import type { $Request, $Response, NextFunction, Middleware } from 'express';

/*
 * NOTE: To handle any complex errors, please use a central
 * error handler
 */

export default [
  /**
   * Handle 404 errors
   *
   * React applications generally handle these errors
   * however its good to have a backup
   */
  // eslint-disable-next-line no-unused-vars
  function notFoundMiddlware(req: $Request, res: $Response, next: NextFunction) {
    res.send(createError(404, 'Sorry, that resource was not found.'));
  },

  /**
   * 500 errors middleware.
   *
   * NOTE: You must provide specify all 4 parameters on this callback function
   * even if they aren't used, otherwise it won't be used.
   */
  function unexpectedErrorMiddleware(
    err?: Error,
    req: $Request,
    res: $Response,
    next: NextFunction,
  ): Middleware {
    if (err) {
      next(
        createError(500, err.toString(), {
          expose: process.env.NODE_ENV !== 'production',
        }),
      );

      return;
    }

    next();
  },
];
