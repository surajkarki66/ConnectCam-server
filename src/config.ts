import dotenv from 'dotenv';

dotenv.config({
  path: './.env',
});

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const DEV_CLIENT_URL = process.env.DEV_CLIENT_URL;
export const PROD_CLIENT_URL = process.env.PROD_CLIENT_URL;
