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
import { emailRegExp, integerString, phoneNumberRegExp } from './commonStructs';

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
    companyName: nonempty(string()),
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
