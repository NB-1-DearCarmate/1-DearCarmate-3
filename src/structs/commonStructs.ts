import {
  coerce,
  integer,
  object,
  string,
  defaulted,
  optional,
  enums,
  nonempty,
  define,
} from 'superstruct';
import isUuid from 'is-uuid';
const uuid = define('uuid', (value): boolean => {
  return typeof value === 'string' && isUuid.v4(value);
});

const integerString = coerce(integer(), string(), (value) => parseInt(value));

export const IdParamsStruct = object({
  id: uuid,
});

export const PageParamsStruct = object({
  page: defaulted(integerString, 1),
  pageSize: defaulted(integerString, 10),
  orderBy: optional(enums(['recent'])),
  keyword: optional(nonempty(string())),
});

export const CursorParamsStruct = object({
  cursor: defaulted(integerString, 0),
  limit: defaulted(integerString, 10),
  orderBy: optional(enums(['recent'])),
  keyword: optional(nonempty(string())),
});
