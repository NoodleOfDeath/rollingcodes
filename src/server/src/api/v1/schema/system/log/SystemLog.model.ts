import {
  Column,
  DataType,
  Table,
} from 'sequelize-typescript';

import {
  SystemLogAttributes,
  SystemLogCreationAttributes,
  SystemLogLevel,
} from './SystemLog.types';
import { BaseModel } from '../../base';

@Table({
  modelName: 'log',
  paranoid: true,
  timestamps: true,
})
export class SystemLog<
    A extends SystemLogAttributes = SystemLogAttributes,
    B extends SystemLogCreationAttributes = SystemLogCreationAttributes,
  >
  extends BaseModel<A, B>
  implements SystemLogAttributes {

  @Column({
    defaultValue: 'info',
    type: DataType.STRING,
  })
  declare level: SystemLogLevel;

  @Column({
    allowNull: false,
    type: DataType.TEXT, 
  })
  declare message: string;

  @Column({
    defaultValue: '',
    type: DataType.TEXT, 
  })
  declare tags: string;

}
