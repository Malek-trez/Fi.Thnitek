import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();


const redisClient = process.env.REDIS_URL
    ? new Redis(process.env.REDIS_URL)
    : process.env.REDIS_HOST
        ? new Redis(6379, process.env.REDIS_HOST)
        : new Redis();

export default redisClient;