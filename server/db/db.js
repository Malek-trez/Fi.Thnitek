import pkg from "pg";
const { Pool } = pkg;
import "dotenv/config";

const pool = process.env.DATABASE_URL
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    })
    : new Pool({
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_NAME,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
    });

export { pool };
