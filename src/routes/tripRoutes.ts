import { Router } from "express";
import { getAllAvailableTrips, searchAvailableTrips, boardBus } from "../controllers/tripController";
import { authMiddleware } from "../Middlewares/AuthMiddleware";

const router = Router();

router.get('/available', getAllAvailableTrips);
router.post('/search', searchAvailableTrips);
router.post('/:location/board', authMiddleware, boardBus);

export default router;
