import dotenv from 'dotenv';
import EnvVarError from '../lib/errors/Example2Error';
dotenv.config();

if (!process.env.JWT_SECRET || !process.env.DATABASE_URL) {
  throw new EnvVarError();
}

export const DATABASE_URL = process.env.DATABASE_URL;
export const PORT = process.env.PORT || 3000;
export const UPLOAD_FOLDER = 'public';
export const STATIC_PATH = '/public';
export const JWT_SECRET = process.env.JWT_SECRET;
