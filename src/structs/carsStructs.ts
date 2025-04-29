import { nonempty, object, string, min, integer, partial } from 'superstruct';
import { PageParamsStruct } from './commonStructs';

export const CreateCarBodyStruct = object({
  carNumber: nonempty(string()),
  manufacturer: nonempty(string()),
  model: nonempty(string()),
  manufacturingYear: min(integer(), 0),
  mileage: min(integer(), 0),
  price: min(integer(), 0),
  accidentCount: min(integer(), 0),
  explanation: nonempty(string()),
  accidentDetails: nonempty(string()),
});

export const GetCarListParamsStruct = PageParamsStruct;

export const UpdateCarBodyStruct = partial(CreateCarBodyStruct);
