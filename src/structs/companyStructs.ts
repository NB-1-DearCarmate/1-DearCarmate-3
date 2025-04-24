import { nonempty, object, string, Infer, optional } from 'superstruct';
import { integerString } from './commonStructs';

export const CreateCompanyBodyStruct = object({
  companyName: nonempty(string()),
  companyCode: nonempty(string()),
});
export type CreateCompanyBodyType = Infer<typeof CreateCompanyBodyStruct>;

export const PatchCompanyBodyStruct = object({
  companyName: optional(nonempty(string())),
  companyCode: optional(nonempty(string())),
});
export type PatchCompanyBodyType = Infer<typeof PatchCompanyBodyStruct>;

export const CompanyIdParamStruct = object({
  companyId: integerString,
});
