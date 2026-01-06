import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/config/sequelize';

interface BusTripAttributes {
  id: number;
  busId: number;
  tripId: number;
  currentBusStopId: number;
  isAvailable: boolean;
}

interface BusTripCreationAttributes
  extends Optional<BusTripAttributes, 'id' | 'isAvailable'> {}

class BusTrip
  extends Model<BusTripAttributes, BusTripCreationAttributes>
  implements BusTripAttributes {
  public id!: number;
  public busId!: number;
  public tripId!: number;
  public currentBusStopId!: number;
  public isAvailable!: boolean;
}

BusTrip.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    busId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currentBusStopId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'bus_trips',
  }
);

export default BusTrip;
