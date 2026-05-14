import dotenv from "dotenv";

dotenv.config({quiet: true});

if (!process.env.DB_URL) {
  throw new Error("DB_URL is missing");
}

export const ENV = {
  PORT: Number(process.env.PORT) || 3000,
  DB_URL: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV || "development",
  FRONTEND_URL: process.env.FRONTEND_URL,
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY
};
