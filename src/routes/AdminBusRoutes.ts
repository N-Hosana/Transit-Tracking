import { Router } from 'express';
import { createBus } from '../controllers/BusController';
import { authorizeAdmin } from '../Middlewares/AuthMiddleware';
const router = Router();

router.post(
  '/buses',
  authorizeAdmin,
  createBus
);

export default router;
