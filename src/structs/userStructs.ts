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

const emailPattern = pattern(
  string(),
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
);

const pwPattern = pattern(string(), /(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}/);

function matchPasswords<T extends { password?: string; passwordConfirmation?: string }>(
  struct: Struct<T>,
) {
  return refine(struct, 'PasswordMatch', (value) => value.password === value.passwordConfirmation);
}

export const CreateUserBodyStruct = matchPasswords(
  object({
    name: string(),
    email: emailPattern,
    employeeNumber: nonempty(string()),
    phoneNumber: nonempty(string()),
    password: pwPattern,
    passwordConfirmation: string(),
    company: nonempty(string()),
    companyCode: nonempty(string()),
  }),
);
export type CreateUserBodyType = Infer<typeof CreateUserBodyStruct>;

export const UpdateUserBodyStruct = matchPasswords(
  object({
    currentPassword: pwPattern,
    employeeNumber: nonempty(string()),
    phoneNumber: nonempty(string()),
    imageUrl: optional(string()),
    password: optional(pwPattern),
    passwordConfirmation: optional(string()),
  }),
);
export type UpdateUserBodyType = Infer<typeof UpdateUserBodyStruct>;

export const DeleteUserBodyType = object({
  userId: integer(),
});
