export type DatedAttributes = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

export * from './system/types';
export * from './article/types';

