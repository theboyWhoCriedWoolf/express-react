import asyncHandler from 'express-async-handler';

import { Request, Response, NextFunction } from 'express';
import config from '../../config';

// Constants
const CORRELATION_HEADER: string = config.get('correlationHeader');

/**
 * Extends Request middleware
 */
interface ICorrelationRequest extends Request {
  correlationId?: string;
}

export default asyncHandler(async (req: ICorrelationRequest, res: Response, next: NextFunction) => {
  res.locals.asset_path = '/public/';
  req.correlationId = `${req.headers[CORRELATION_HEADER] || ''}`;
  next();
});
