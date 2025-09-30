import {
  Request as ExpressRequest,
  NextFunction,
  Response,
} from 'express';

import { JWT } from '../common/jwt';

export type Request = ExpressRequest & {
  jwt?: JWT;
  nonce?: string;
  version?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;