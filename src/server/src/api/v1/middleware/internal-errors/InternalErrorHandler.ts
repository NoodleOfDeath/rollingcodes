import { Response } from 'express';

import { BadRequest } from './BadRequest';
import { InternalError } from './InternalError';

export const internalErrorHandler = (res: Response, error: Error | string) => {
  console.error(error);
  if (error instanceof InternalError && error.sensitive === false) {
    if (error instanceof BadRequest) {
      return res.status(401).json(error);
    }
    return res.status(500).json(error);
  }
  const nonce = [new Date().toString()].join(' §§ ');
  return res.status(500).json(new Error(`Unknown Error: ${nonce}`));
};