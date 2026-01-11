import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/config/sequelize';

interface TripAttributes {
  id: number;
  from: string;
  to: string;
  price: number;
  estimatedDurationMinutes: number;
  isActive: boolean;
  createdById: number;
  AvailableSeats: number;
  fromBusStopId?: number;
  toBusStopId?: number;
}

interface TripCreationAttributes
  extends Optional<TripAttributes, 'id' | 'isActive' | 'fromBusStopId' | 'toBusStopId'> {}

class Trip extends Model<TripAttributes, TripCreationAttributes>
  implements TripAttributes {
  public id!: number;
  public from!: string;
  public to!: string;
  public price!: number;
  public estimatedDurationMinutes!: number;
  public isActive!: boolean;
  public createdById!: number;
  public AvailableSeats!: number;
  public fromBusStopId?: number;
  public toBusStopId?: number;
}

Trip.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estimatedDurationMinutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdById: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    AvailableSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fromBusStopId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    toBusStopId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'trips',
  }

);

export default Trip;
