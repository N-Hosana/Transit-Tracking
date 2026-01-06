import Bus from './Bus';
import Trip from './trip';
import BusStop from './Busstop';
import User from './user';
import BusTrip from './BusTrip';

// Many-to-many
Bus.belongsToMany(Trip, { through: BusTrip, foreignKey: 'busId' });
Trip.belongsToMany(Bus, { through: BusTrip, foreignKey: 'tripId' });

// Trip endpoints
Trip.belongsTo(BusStop, { as: 'fromlocation', foreignKey: 'fromBusStopId' });
Trip.belongsTo(BusStop, { as: 'tolocation', foreignKey: 'toBusStopId' });

// Bus location
BusTrip.belongsTo(BusStop, {
  foreignKey: 'currentBusStopId',
  as: 'currentLocation',
});

// Admin ownership
Bus.belongsTo(User, { foreignKey: 'createdById', as: 'createdBy' });
Trip.belongsTo(User, { foreignKey: 'createdById', as: 'createdBy' });

export { Bus, Trip, BusTrip };
