import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 5500;

export const { NODE_ENV,
    SERVER_URL,
    DB_URI,
    JWT_SECRET, JWT_EXPIRES_IN,
    ARCJET_ENV, ARCJET_KEY,
    QSTASH_TOKEN, QSTASH_URL,
    EMAIL_PASSWORD
} = process.env;

