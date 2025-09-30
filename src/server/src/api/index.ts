import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import expressWinston from 'express-winston';
import winston from 'winston';

import v1router from './v1';
import {  rateLimitMiddleware } from './v1/middleware';
import { DBService } from '../services';

async function main() {
  
  await DBService.prepare();
  
  const app = express();
  
  const IGNORE_PATHS = [
    '/v1/healthz',
  ];
  
  app.use(expressWinston.logger({
    colorize: true,
    expressFormat: true,
    format: winston.format.combine(winston.format.colorize(), winston.format.json()), 
    ignoreRoute: (req) => {
      if (IGNORE_PATHS.includes(req.path)) {
        return true;
      }
      return false;
    },
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}', 
    skip: () => {
      return false;
    }, 
    transports: [new winston.transports.Console()], // optional: allows to skip some log messages based on request and/or response
  }));
  
  app.use(cors({ origin: new RegExp(process.env.CORS_ORIGIN, 'i') }));
  
  app.use(bodyParser.urlencoded({
    extended: false,
    limit: process.env.REQ_SIZE_LIMIT ?? '10MB',
  }));
  
  app.use(bodyParser.json({ limit: process.env.REQ_SIZE_LIMIT }));
  
  app.set('trust proxy', true);
  
  app.use(rateLimitMiddleware({
    duration: process.env.API_RATE_LIMIT_DURATION || '1m',
    limit: process.env.API_RATE_LIMIT ? Number(process.env.API_RATE_LIMIT) : 300,
    path: '',
  }));

  app.use('/v1', v1router);
  app.use(express.static('/v1/docs'));
  
  app.use('*', (_, res) => {
    res.status(404).json({ message: 'Bad Request' });
  });
  
  app.use(expressWinston.errorLogger({
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    transports: [new winston.transports.Console()],
  }));
  
  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
  
}

main();
