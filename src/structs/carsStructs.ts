import {
  nonempty,
  object,
  string,
  min,
  integer,
  partial,
  optional,
  enums,
  assign,
  Infer,
  array,
} from 'superstruct';
import { PageParamsStruct } from './commonStructs';

export const CreateCarBodyStruct = object({
  carNumber: nonempty(string()),
  manufacturer: nonempty(string()),
  model: nonempty(string()),
  manufacturingYear: min(integer(), 0),
  mileage: min(integer(), 0),
  price: min(integer(), 0),
  accidentCount: min(integer(), 0),
  explanation: string(),
  accidentDetails: string(),
});
export type CreateCarBodyType = Infer<typeof CreateCarBodyStruct>;

export const GetCarListParamsStruct = assign(
  PageParamsStruct,
  object({
    status: optional(enums(['possession', 'contractProceeding', 'contractCompleted'])),
    searchBy: optional(enums(['companyName', 'name', 'email'])),
    keyword: optional(nonempty(string())),
  }),
);

export const UpdateCarBodyStruct = partial(CreateCarBodyStruct);
export type UpdateCarBodyType = Infer<typeof UpdateCarBodyStruct>;

export const BulkCreateCarBodyStruct = array(CreateCarBodyStruct);
