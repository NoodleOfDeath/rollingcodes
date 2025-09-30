import { DatedAttributes } from '../types';

export type RateLimitAttributes = DatedAttributes & {
  key: string;
  points: number;
  limit: number;
  window: number;
  expiresAt: Date;
};

export type RateLimitCreationAttributes = { 
  key: string;
  points?: number;
  limit: number;
  window: number;
  expiresAt: Date;
};