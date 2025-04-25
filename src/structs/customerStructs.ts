import { nonempty, object, string, Infer, optional, literal, union } from 'superstruct';

const AgeGroupEnum = union([
  literal('10대'),
  literal('20대'),
  literal('30대'),
  literal('40대'),
  literal('50대'),
  literal('60대'),
  literal('70대'),
  literal('80대'),
]);

const RegionEnum = union([
  literal('서울'),
  literal('경기'),
  literal('인천'),
  literal('강원'),
  literal('충북'),
  literal('충남'),
  literal('세종'),
  literal('대전'),
  literal('전북'),
  literal('전남'),
  literal('광주'),
  literal('경북'),
  literal('경남'),
  literal('대구'),
  literal('울산'),
  literal('부산'),
  literal('제주'),
]);

export const CreateCustomerBodyStruct = object({
  name: nonempty(string()),
  gender: nonempty(string()),
  phoneNumber: nonempty(string()),
  ageGroup: AgeGroupEnum,
  region: RegionEnum,
  email: nonempty(string()),
  memo: optional(string()),
});
export type CreateCustomerBodyType = Infer<typeof CreateCustomerBodyStruct>;

export const PatchCustomerBodyStruct = object({
  name: optional(nonempty(string())),
  gender: optional(nonempty(string())),
  phoneNumber: optional(nonempty(string())),
  ageGroup: optional(AgeGroupEnum),
  region: optional(RegionEnum),
  email: optional(nonempty(string())),
  memo: optional(string()),
});
export type PatchCustomerBodyType = Infer<typeof PatchCustomerBodyStruct>;
