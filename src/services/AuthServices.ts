import { query } from "../db/config";
import { hashPassword, comparePassword } from "../utils/password";
import { signToken } from "../utils/jwt";

export const register = async (
  email: string,
  password: string,
  name?: string
) => {
  const hashed = await hashPassword(password);

  const result = await query(
    `INSERT INTO users (email, password, name)
     VALUES ($1, $2, $3)
     RETURNING id, email, role`,
    [email, hashed, name || null]
  );

  return signToken(result.rows[0]);
};

export const login = async (email: string, password: string) => {
  const result = await query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (!result.rows.length) {
    throw new Error("Invalid credentials");
  }

  const user = result.rows[0];

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  return signToken({ id: user.id, role: user.role });
};
