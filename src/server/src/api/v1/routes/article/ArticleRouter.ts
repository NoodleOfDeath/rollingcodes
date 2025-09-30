import { Router } from 'express';

import { ArticleController } from './ArticleController';
import {
  PaginationRequest,
  internalErrorHandler,
  paginationMiddleware,
  validationMiddleware,
} from '../../middleware';

export const ArticleRouter = Router();

ArticleRouter.get(
  '/',
  ...paginationMiddleware,
  validationMiddleware,
  async (req, res) => {
    try {
      const {
        limit,
        offset,
        id,
        startDate,
        endDate,
      } = req.query as PaginationRequest;
      const articles = await ArticleController.getArticles(req, limit, offset, id, startDate, endDate);
      res.status(200).json(articles);
    } catch (e) {
      internalErrorHandler(res, e);
    }
  }
);