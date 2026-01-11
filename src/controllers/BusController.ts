import { Request, Response } from 'express';
import Bus from '../models/Bus';

export async function createBus(req: Request, res: Response) {
  const { plateNumber, driverName, totalSeats } = req.body;
  
  const bus = await Bus.create({
    plateNumber,
    driverName,
    totalSeats,
    availableSeats: totalSeats,
    createdById: (req as any).user?.id || 1
  });
  
  res.status(201).json(bus);
}

export async function getAllBuses(req: Request, res: Response) {
  const buses = await Bus.findAll();
  res.json(buses);
}