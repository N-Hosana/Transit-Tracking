import { query } from "../db/config";
import  User  from "../models/user";
import {Transaction} from 'sequelize';

export const getUsers = async (): Promise<User[]> => {
  const result = await query("SELECT * FROM users");
  return result.rows;
};

export const createUser = async (
   data: {
    name: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'USER';
  },
    transaction?:Transaction

) => {
   return User.create(data, transaction ? { transaction } : undefined);
};
