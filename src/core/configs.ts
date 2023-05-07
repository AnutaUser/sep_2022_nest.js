import { config } from 'dotenv';

config();

export const configs = {
  PORT: process.env.PORT,

  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
  JWT_TOKEN_EXPIRES_IN: process.env.JWT_TOKEN_EXPIRES_IN,
};
