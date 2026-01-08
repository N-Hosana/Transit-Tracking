import { Request, Response } from "express";
import * as authService from "../services/AuthServices";
import User  from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function register(req: Request, res: Response) {
  const { name, email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role === 'ADMIN' ? 'ADMIN' : 'USER',
  });

  return res.status(201).json({
    id: user.id,
    email: user.email,
    role: user.role,
  });
}


export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  );

  return res.json({
    token,
    role: user.role,
  });
}
