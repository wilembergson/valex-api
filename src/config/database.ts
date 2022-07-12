import pg from 'pg'
import dotenv from "dotenv"
dotenv.config()

const configDatabase = {
  connectionString: process.env.DATABASE_URL,
  ssl:null
};

if(process.env.MODE === "PROD") {
  configDatabase.ssl = {
    rejectUnauthorized: false
  }
}

const { Pool } = pg;
const db = new Pool(configDatabase);
export default db;