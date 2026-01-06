import { Pool } from "pg";
import { env } from "./env";





export const pool = new Pool({
  connectionString: env.databaseUrl,
});

pool.on("connect", () => {
  console.log("PostgreSQL connected");
});
