import * as path from 'path';
import asyncHandler from 'express-async-handler';
import { Application, Request, Response } from 'express';

import { IMiddlewareOptions } from '../types';

export default function addProdMiddleware(app: Application, options: IMiddlewareOptions) {
  const outputPath: string = options.outputPath || path.resolve(process.cwd(), 'build');
  app.get(
    '*',
    asyncHandler(async (req: Request, res: Response) =>
      res.status(200).sendFile(path.resolve(outputPath, 'index.html')),
    ),
  );
}
