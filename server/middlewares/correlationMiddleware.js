// @flow
import asyncHandler from 'express-async-handler';
import type { $Request, $Response, NextFunction } from 'express';

import config from '../../config';

// Constants
const CORRELATION_HEADER = config.get('correlationHeader');

export default asyncHandler(
  async (req: $Request, res: $Response, next: NextFunction): Promise<void> => {
    res.locals.asset_path = '/public/';
    req.correlationId = req.headers[CORRELATION_HEADER] || '';
    next();
  },
);
