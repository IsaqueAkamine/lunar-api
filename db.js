import postgres from "postgres";
import { TempEnv } from "./tempEnv.js";

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
// let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = TempEnv;

export const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: "require",
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});
