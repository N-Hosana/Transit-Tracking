import { Request, Response } from 'express';
import { findAvailableBuses } from '../services/tripServices';
import { Bus, Trip } from '../models';

export async function getAllAvailableTrips(req: Request, res: Response) {
  const trips = await Trip.findAll({
    where: { isActive: true }
  });
  return res.json(trips);
}

export async function searchAvailableTrips(req: Request, res: Response) {
  const { from } = req.body;

  if (!from) {
    return res.status(400).json({
      message: 'Current location required'
    });
  }

  const results = await findAvailableBuses(from);
  return res.json(results);
}

export async function createTrip(req: Request, res: Response) {
  const { from, to, price, estimatedDurationMinutes, availableSeats, busId } = req.body;
  
  const trip = await Trip.create({
    from,
    to,
    price,
    estimatedDurationMinutes,
    AvailableSeats: availableSeats,
    createdById: (req as any).user?.id || 1
  });
  
  res.status(201).json(trip);
}

export async function getAllTrips(req: Request, res: Response) {
  const trips = await Trip.findAll();
  res.json(trips);
}

export async function boardBus(req: Request, res: Response) {
  const { location } = req.params;
  const tripId = parseInt(location);

  if (isNaN(tripId)) {
    return res.status(400).json({ message: 'Invalid trip ID' });
  }

  const trip = await Trip.findByPk(tripId);

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

