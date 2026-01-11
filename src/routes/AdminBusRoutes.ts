import { Router } from 'express';
import { createBus } from '../controllers/BusController';
import { authenticate, authMiddleware, authorizeAdmin } from '../Middlewares/AuthMiddleware';
import { createTrip, getAllTrips } from '../controllers/tripController';

const router = Router();

router.post(
  '/buses',
  authenticate,
  authorizeAdmin,
  createBus
);

router.post(
  '/trips',
  authMiddleware,
  authorizeAdmin,
  createTrip
);

router.get(
  '/trips',
  authMiddleware,
  authorizeAdmin,
  getAllTrips
);

export default router;
