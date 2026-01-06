import { DataTypes, Model } from "sequelize";
import sequelize from "../db/config/sequelize";

class BusStop extends Model {
  public id!: number;
  public name!: string;
  public  isHub!: boolean;
  
}

BusStop.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    isHub: {
  type: DataTypes.BOOLEAN,
  defaultValue: false
}
  },
  {
    sequelize,
    modelName: "BusStop",
    tableName: "bus_stops",
    timestamps: false,
  }
);

export default BusStop;
