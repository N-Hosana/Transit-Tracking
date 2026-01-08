import { Request, Response } from 'express';
import { findAvailableBuses } from '../services/tripServices';

export async function searchAvailableTrips(req: Request, res: Response) {
  const { currentBusStopId, destinationBusStopId } = req.body;

  if (!currentBusStopId ) {
    return res.status(400).json({
      message: 'Current location and destination are required'
    });
  }

  const results = await findAvailableBuses(
    currentBusStopId,
    destinationBusStopId

   
  );

  return res.json(results);
}
