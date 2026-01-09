import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { env } from "../db/config/env";
import User from "../models/user";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
    isAdmin: boolean;
  };
}

  export interface AdminRequest extends Request {
    user: {
      id: number;
      role: string;
      isAdmin: boolean;
    };
  }
export function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
}
export function verifyUser(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ message: "User authentication required" });
  }
  next();
}
export function authenticate(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ message: "User authentication required" });
  }
  next(); 
}

  export function authorizeAdmin(req: Request, res: Response, next: NextFunction) { 
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  }


export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as {
      id: number;
      role: string;
    };

    (req as any).user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};