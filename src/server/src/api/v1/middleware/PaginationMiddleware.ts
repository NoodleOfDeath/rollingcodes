import { query } from 'express-validator';

export type PaginationRequest = {
  id?: number;
  limit?: number;
  offset?: number;
  order?: string;
  startDate?: number;
  endDate?: number;
};

export const paginationMiddleware = [
  query('id').isNumeric().optional(),
  query('limit')
    .isNumeric().optional().default(10),
  query('offset')
    .isNumeric().optional().default(0),
  query('order').isString().optional(),
  query('startDate')
    .if(query('endDate').exists())
    .isNumeric(),
  query('endDate').isNumeric().optional(),
];
