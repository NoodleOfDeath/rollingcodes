import ms from 'ms';

import { BadRequest, internalErrorHandler } from './internal-errors';
import { Request, RequestHandler } from './types';
import { DurationString } from '../../../utils';
import { RateLimit, RequestLog } from '../schema';

export type RateLimitString = `${number}${'/'|'every'|'per'}${DurationString}`;

export function parseDurationString(period: number | string) {
  const duration = typeof period === 'number' ? period : ms(period);
  return !Number.isNaN(duration) ? duration : undefined;
}

export type RateLimitOptions = {
  duration: number | string;
  limit: number;
  path?: string | ((req: Request) => string);
};

function parseRateLimitString(rateLimitString: RateLimitString): RateLimitOptions {
  const [limit, period] = rateLimitString.split(/\s*(?:\/|every|per)\s*/i);
  return {
    duration: parseDurationString(period) ?? ms('10m'),
    limit: Number.isNaN(Number.parseInt(limit)) ? 200 : Number.parseInt(limit),
    path: (req) => [req.method, req.path].join(':'),
  };
}

export const rateLimitMiddleware = (
  opts: RateLimitOptions | RateLimitString = {
    duration: ms('10m'), 
    limit: 200, 
    path: (req) => [req.method, req.path].join(':'), 
  }
): RequestHandler => {
  const options = typeof opts === 'string' ? parseRateLimitString(opts) : opts;
  const duration = parseDurationString(options.duration);
  return async (req, res, next) => {
    try {
      const path = options.path instanceof Function ? options.path(req) : options.path;
      const appVersion = req.get('x-app-version');
      const locale = req.get('x-locale');
      const platform = req.get('x-platform');
      const uuid = req.get('x-uuid');
      const userAgent = req.get('user-agent');
      if (/kube-probe/i.test(userAgent)) {
        res.status(200).send('OK');
        return;
      }
      const user = req.jwt?.user;
      await RequestLog.create({
        appVersion,
        locale,
        path,
        platform,
        remoteAddr: [uuid, req.ip].filter(Boolean).join('-'),
        userAgent,
        userId: user?.id,
      });
      const key = path ? [req.ip, path].join(':') : req.ip;
      const limit = await RateLimit.findOne({ where: { key } });
      if (limit) {
        if (await limit.isSaturated()) {
          res.status(429).json(new BadRequest('TOO_MANY_REQUESTS'));
          return;
        }
        await limit.advance();
      } else {
        await RateLimit.create({
          expiresAt: new Date(Date.now() + duration),
          key,
          limit: options.limit,
          points: 0,
          window: duration,
        });
      }
      next();
    } catch (e) {
      internalErrorHandler(res, e);
    }
  };

};
