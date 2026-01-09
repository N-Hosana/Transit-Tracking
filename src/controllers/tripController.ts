import { Request, Response } from 'express';
import { findAvailableBuses } from '../services/tripServices';
import { Bus, Trip } from '../models';


export async function getAllAvailableTrips(req: Request, res: Response) {
  const trips = await Trip.findAll({
    where: { isActive: true },
    include: [
      {
        model: Bus,
        attributes: ['id', 'plateNumber', 'driverName', 'capacity']
      }
    ]
  });

  return res.json(trips);
}
export async function searchAvailableTrips(req: Request, res: Response) {
  const { currentBusStop } = req.body;

  if (!currentBusStop ) {
    return res.status(400).json({
      message: 'Current location required'
    });
  }

  const results = await findAvailableBuses(
    currentBusStop,
   

   
  );
  
  return res.json(results);
}
export async function boardBus(req: Request, res: Response) {
  const { id } = req.params;

  const trip = await Trip.findByPk(id);

  if (!trip) {
    return res.status(404).json({ message: 'Trip not found' });
  }

  if (trip.AvailableSeats <= 0) {
    return res.status(400).json({ message: 'No seats available' });
  }

  trip.AvailableSeats -= 1;
  await trip.save();

  return res.json({
    message: 'Boarded successfully',
    availableSeats: trip.AvailableSeats
  });
}

