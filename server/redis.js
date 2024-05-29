import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

let redisClient = "";
if (process.env.USE_REDIS === "YES") {
    redisClient = process.env.REDIS_URL
        ? new Redis(process.env.REDIS_URL)
        : process.env.REDIS_HOST
            ? new Redis(6379, process.env.REDIS_HOST)
            : new Redis();
    console.log("Connected to redis")
}

export default redisClient;
