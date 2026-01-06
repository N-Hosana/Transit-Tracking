import * as jwt from "jsonwebtoken";
import { env } from "../db/config/env";

export const signToken = (payload: object) => {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.jwtSecret);
};
