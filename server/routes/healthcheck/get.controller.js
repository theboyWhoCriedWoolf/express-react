// @flow
import asyncHandler from 'express-async-handler';

export default asyncHandler(
  async (req, res): Promise<void> => {
    const data: Object = { ping: { healthy: true } };
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
  },
);
