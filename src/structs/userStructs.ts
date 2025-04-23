import {
  nonempty,
  optional,
  object,
  partial,
  string,
  pattern,
  refine,
  Infer,
  Struct,
  integer,
} from 'superstruct';
import { integerString } from './commonStructs';

const emailRegExp = pattern(
  string(),
  // /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
);

const phoneNumberRegExp = pattern(string(), /^\d{2,3}-\d{3,4}-\d{4}$/);

const pwRegExp = pattern(string(), /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/);

function matchPasswords<T extends { password?: string; passwordConfirmation?: string }>(
  struct: Struct<T>,
) {
  return refine(struct, 'PasswordMatch', (value) => value.password === value.passwordConfirmation);
}

export const CreateUserBodyStruct = matchPasswords(
  object({
    name: string(),
    email: emailRegExp,
    employeeNumber: nonempty(string()),
    phoneNumber: phoneNumberRegExp,
    password: pwRegExp,
    passwordConfirmation: string(),
    company: nonempty(string()),
    companyCode: nonempty(string()),
  }),
);
export type CreateUserBodyType = Infer<typeof CreateUserBodyStruct>;

export const UpdateUserBodyStruct = matchPasswords(
  object({
    currentPassword: pwRegExp,
    employeeNumber: nonempty(string()),
    phoneNumber: phoneNumberRegExp,
    imageUrl: optional(string()),
    password: optional(pwRegExp),
    passwordConfirmation: optional(string()),
  }),
);
export type UpdateUserBodyType = Infer<typeof UpdateUserBodyStruct>;

export const DeleteUserParamStruct = object({
  userId: integerString,
});
