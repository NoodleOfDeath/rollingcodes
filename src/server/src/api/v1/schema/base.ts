import { Model } from 'sequelize-typescript';

import { DBService } from '../../../services';

export abstract class BaseModel<ModelAttributes extends object, CreationAttributes extends object>
  extends Model<ModelAttributes, CreationAttributes> {

  public declare id: number;

  public declare createdAt: Date;
  public declare updatedAt: Date;
  
  public static get sql() {
    return DBService.sql;
  }

  public static get empty() {
    return this.json();
  }

  public static json<CreationAttributes>(defaults?: Partial<CreationAttributes>): Partial<CreationAttributes> {
    return defaults ?? {};
  }
  
  declare public static addScopes: () => void;
  declare public static prepare: () => Promise<void>;

}