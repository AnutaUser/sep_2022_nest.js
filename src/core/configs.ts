import { config } from 'dotenv';

config();

export const configs = {
  PORT: process.env.PORT,
  JWT_TOKEN_SECRET_KEY: process.env.TOKEN_SECRET_KEY,
};
