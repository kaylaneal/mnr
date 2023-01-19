// process.env: env file holds all environment variables set before running the server
const env = process.env

export const PORT = env.PORT ?? "8080"; // use port defined in .env, if no value use 8080 as default
export const HOST = env.HOST ?? "0.0.0.0";
export const SERVER_URL  = `http://${HOST}:${PORT}`;
export const API_SERVER_URL  = `http://${HOST}:${PORT}/api`;
export const MONGODB_URI = env.MONGODB_URI ?? "mongodb://localhost:27017";
export const DATABASE_NAME = env.DATABASE_NAME ?? "local";

export default{
    PORT,
    HOST,
    SERVER_URL
};