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
export const PERIOD_ACCESS_TOKEN = '6h';
export const PERIOD_REFRESH_TOKEN = '2d';
export const FILE_NAME_ENCODING = 'latin1';
export const FILE_NAME_TOSTRING = 'utf8';
export const ACCESS_TOKEN_STRATEGY = 'access-token';
export const REFRESH_TOKEN_STRATEGY = 'refresh-token';

export const LOCAL_STRING = 'local';
export const REFRESH_STRING = 'refresh';
export const ID_STRING = 'id';
export const RECENT_STRING = 'recent';
export const DESC_STRING = 'desc';
export const ASC_STRING = 'asc';
export const EXT_STRING = 'ext';
export const HOST_STRING = 'host';
export const REFRESH_tOKEN_STRING = 'refreshToken';
export const NONE_STRING = 'none';
export const EMAIL_STRING = 'email';
