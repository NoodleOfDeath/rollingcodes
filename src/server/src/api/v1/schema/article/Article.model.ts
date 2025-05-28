import {
  Column,
  DataType,
  Table,
} from 'sequelize-typescript';

import { ArticleAttributes, ArticleCreationAttributes } from './Article.types';
import { BaseModel } from '../base';

@Table({
  modelName: '_rollingcodes_articles',
  paranoid: true,
  timestamps: true,
})
export class Article<
  A extends ArticleAttributes = ArticleAttributes,
  B extends ArticleCreationAttributes = ArticleCreationAttributes,
> extends BaseModel<A, B> implements ArticleAttributes {
  
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare title: string;
  
  @Column({
    allowNull: false,
    type: DataType.TEXT,
  })
  declare body: string;

}