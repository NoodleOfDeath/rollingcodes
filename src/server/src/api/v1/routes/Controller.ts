import { Request } from 'express';

import { DBService } from '../../../services';

export abstract class BaseController {

  public static serializeParams(req: Request) {
    const params = Object.fromEntries(Object.entries({
      ... req.query, ...req.params, ...req.headers, 
    }).map(([key, value]) => { 
      if (value === 'true') {
        return [key, true];
      }
      if (value === 'false') {
        return [key, false];
      }
      if (value === 'null') {
        return [key, null];
      }
      if (value === 'undefined') {
        return [key, false];
      }
      if (typeof value === 'string' && /^\d+$/.test(value)) {
        return [key, parseInt(value, 10)];
      }
      return [key, value];
    }));
    return {
      ...params,
      locale: req.query['locale'] || req.get('x-locale'),
      platform: req.get('x-platform'),
      userId: req.get('x-user-id'),
      version: req.get('x-version'),
    };
  }
  
  public static get store() { 
    return DBService.sql;
  }

}
