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
  Infer,
} from 'superstruct';

export const integerString = coerce(integer(), string(), (value) => parseInt(value));

export const CarIdParamsStruct = object({
  carId: integerString,
});

const urlRegExp = /^(https?:\/\/)/;

export const PageParamsStruct = object({
  page: defaulted(integerString, 1),
  pageSize: defaulted(integerString, 10),
  status: optional(enums(['possession', 'contractProceeding', 'contractCompleted'])),
  searchBy: optional(enums(['companyName', 'name', 'email'])),
  keyword: optional(nonempty(string())),
});
export type PageParamsType = Infer<typeof PageParamsStruct>;

export const CursorParamsStruct = object({
  cursor: defaulted(integerString, 0),
  limit: defaulted(integerString, 10),
  orderBy: optional(enums(['recent'])),
  keyword: optional(nonempty(string())),
});
