import { Router } from "express";
import * as authController from "../controllers/AuthController";

const router = Router();

router.post("/register", authController.register);
router.post('/admin/login', authController.login);

router.post("/login", authController.login);

export default router;
