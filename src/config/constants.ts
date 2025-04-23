import dotenv from 'dotenv';
import CommonError from '../lib/errors/CommonError';
dotenv.config();

if (!process.env.JWT_SECRET || !process.env.DATABASE_URL) {
  throw new CommonError('Missing Environment Variable', 500);
}

export const DATABASE_URL = process.env.DATABASE_URL;
export const PORT = process.env.PORT || 3000;
export const UPLOAD_FOLDER = 'public';
export const STATIC_PATH = '/public';
export const JWT_SECRET = process.env.JWT_SECRET;
export const ACCESS_TOKEN_STRATEGY = 'access-token';
export const REFRESH_TOKEN_STRATEGY = 'refresh-token';
export const LOCAL_STRATEGY = 'local';
export const ACCESS_tOKEN_STRING = 'accessToken';
export const REFRESH_tOKEN_STRING = 'refreshToken';
