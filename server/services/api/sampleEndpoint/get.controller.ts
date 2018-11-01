import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

export default asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.send(
      `[ Making GET request to sampleApi API ${
        req.params.value ? `with "${req.params.value}"` : ''
      } ]`,
    );
  },
);
