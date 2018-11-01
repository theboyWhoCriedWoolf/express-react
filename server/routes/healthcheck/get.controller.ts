import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

export default asyncHandler(async (req: Request, res: Response) => {
  const data = { ping: { healthy: true } };
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(data);
});
