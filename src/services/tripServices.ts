import { Op } from 'sequelize';
import  BusTrip  from '../models/BusTrip';
import  Trip  from '../models/trip';
import  Bus  from '../models/Bus';
import * as pool from '../db/config';


export async function findAvailableBuses(from: string) {
  return Trip.findAll({
    where: {
      from,
      AvailableSeats: { [Op.gt]: 0 }
    }
  });
}
  export async function boardTrip(tripId: number, userId: number, currentBusStopId: number)
   {
  const canBoard = await canBoardAtLocation(tripId, currentBusStopId);
  if (!canBoard) {
    const error = new Error("You cannot board this trip from your current location");
    (error as any).status = 403;
    throw error;
  }

  try {
    await pool.query("BEGIN");

    const tripResult = await pool.query(
      "SELECT available_seats FROM trips WHERE id = $1 FOR UPDATE",
      [tripId]
    );
    if (tripResult.rows.length === 0) {
      await pool.query("ROLLBACK");
      const error = new Error("Trip not found");
      (error as any).status = 404;
      throw error;
    }

    const availableSeats = tripResult.rows[0].available_seats;
    if (availableSeats <= 0) {
      await pool.query("ROLLBACK");
      const error = new Error("No available seats");
      (error as any).status = 400;
      throw error;
    }

    await pool.query(
      "UPDATE trips SET available_seats = available_seats - 1 WHERE id = $1",
      [tripId]
    );

    await pool.query(
      `INSERT INTO boardings (trip_id, user_id, boarding_bus_stop_id, boarded_at)
       VALUES ($1, $2, $3, NOW())`,
      [tripId, userId, currentBusStopId]
    );

    await pool.query("COMMIT");

    return { message: "Boarded successfully", availableSeats: availableSeats - 1 };
  } catch (err) {
    await pool.query("ROLLBACK");
    throw err;
  }
}

async function canBoardAtLocation(tripId: number, currentBusStopId: number): Promise<boolean> {
  const result = await pool.query(
    `SELECT 1 FROM trip_stops WHERE trip_id = $1 AND bus_stop_id = $2 LIMIT 1`,
    [tripId, currentBusStopId]
  );
  return result.rows.length > 0;
}

