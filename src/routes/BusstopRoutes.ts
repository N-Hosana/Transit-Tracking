import express from "express";
import { getBusStops, createBusStop } from "../controllers/BusstopController";
import { verifyAdmin } from "../Middlewares/AuthMiddleware";

const router = express.Router();

router.get("/", getBusStops);
router.post("/", verifyAdmin, createBusStop);

export default router;
