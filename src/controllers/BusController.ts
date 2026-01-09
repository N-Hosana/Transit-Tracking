import { Request, Response } from 'express';
import Bus from '../models/Bus';

export async function createBus(req: Request, res: Response) {
  const bus = await Bus.create(req.body);
  res.status(201).json(bus);
}
export async function getAllBuses(req: Request, res: Response) {
  const buses = await Bus.findAll();
  res.json(buses);
}