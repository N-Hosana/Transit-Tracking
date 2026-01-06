import { Request, Response } from "express";
import BusStop from "../models/Busstop";

export const getBusStops = async (req: Request, res: Response) => {
  const busStops = await BusStop.findAll();
  res.json(busStops);
};

export const createBusStop = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name required" });

  try {
    const [busStop, created] = await BusStop.findOrCreate({ where: { name } });
    if (!created) return res.status(409).json({ message: "Bus stop already exists" });
    res.status(201).json(busStop);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
