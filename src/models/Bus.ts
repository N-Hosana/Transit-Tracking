import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/config/sequelize';

interface BusAttributes {
  id: number;
  plateNumber: string;
  totalSeats: number;
  availableSeats: number;
  isActive: boolean;
  driverName?: string;
  createdById: number;
}

interface BusCreationAttributes
  extends Optional<BusAttributes, 'id' | 'driverName' | 'isActive'> {}

class Bus extends Model<BusAttributes, BusCreationAttributes>
  implements BusAttributes {
  public id!: number;
  public plateNumber!: string;
  public totalSeats!: number;
  public availableSeats!: number;
  public isActive!: boolean;
  public driverName?: string;
  public createdById!: number;
}

Bus.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    plateNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    availableSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    driverName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdById: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'buses',
  }
);

export default Bus;
