import { query } from "../db/config";
import  User  from "../models/user";

export const getUsers = async (): Promise<User[]> => {
  const result = await query("SELECT * FROM users");
  return result.rows;
};

export const createUser = async (email: string, name?: string) => {
  const result = await query(
    "INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *",
    [email, name || null]
  );

  return result.rows[0];
};
