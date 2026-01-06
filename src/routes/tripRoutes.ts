import { Router, Request, Response } from "express";
import { Trip } from "../models";  // Make sure your index.ts exports Trip
import { ROUTING_RULES } from "../db/config/routingrules";

const router = Router();

// GET trips filtered by current_location and destination
router.get("/", async (req: Request, res: Response) => {
  try {
    const current_location = req.query.current_location as string;
    const destination = req.query.destination as string;

    if (!current_location || !destination) {
      return res.status(400).json({ message: "current_location and destination are required" });
    }

  const rule = ROUTING_RULES[current_location];

const allowedDestinations = rule;
rule===undefined? null : rule;


if (allowedDestinations && !allowedDestinations.includes(destination)) {
  return res.json([]); // No buses from this location to that destination
}
else if(allowedDestinations)
    {
  
  if (!allowedDestinations.includes(destination)) {
    return res.json([]); 
  }
} else {

}

    // Find trips matching the from/to 
    const trips = await Trip.findAll({
      where: {
        from: current_location,
        to: destination,
      },
    });

    return res.json(trips);
  } catch (error) {
    console.error("Error fetching trips:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET trip by ID
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid trip ID" });

  try {
    const trip = await Trip.findByPk(id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    return res.json(trip);
  } catch (error) {
    console.error("Error fetching trip:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST create trip (admin only - assume auth middleware)
router.post("/", async (req: Request, res: Response) => {
  const { bus_id, route_name, departure_time, available_seats, from_location, to_location } = req.body;

  if (
    !bus_id ||
    !route_name ||
    !departure_time ||
    typeof available_seats !== "number" ||
    !from_location ||
    !to_location
  ) {
    return res.status(400).json({ message: "Missing or invalid fields" });
  }

  try {
    const newTrip = await Trip.create({
      id: bus_id,
      from: from_location,
      to: to_location,
      price: 0, 
      estimatedDurationMinutes: 0, 
      isActive: true,
      createdById: 1,
      AvailableSeats: available_seats,
    });

    return res.status(201).json(newTrip);
  } catch (error) {
    console.error("Error creating trip:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST board a trip (decrement available seats)
router.post("/:id/board", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid trip ID" });

  try {
    const trip = await Trip.findByPk(id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    if (trip.AvailableSeats <= 0) {
      return res.status(400).json({ message: "No available seats" });
    }

    trip.AvailableSeats -= 1;
    await trip.save();

    return res.json({ message: "Boarded successfully", availableSeats: trip.AvailableSeats });
  } catch (error) {
    console.error("Error boarding trip:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
