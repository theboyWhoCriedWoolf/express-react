// @flow

import asyncHandler from 'express-async-handler';

export default asyncHandler(
  async (req, res): Promise<void> => {
    res.send(
      `[ Making GET request to sampleApi API ${
        req.params.value ? `with "${req.params.value}"` : ''
      } ]`,
    );
  },
);
