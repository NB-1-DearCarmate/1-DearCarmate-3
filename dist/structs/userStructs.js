"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserParamStruct = exports.UpdateUserBodyStruct = exports.CreateUserBodyStruct = void 0;
const superstruct_1 = require("superstruct");
const commonStructs_1 = require("./commonStructs");
const pwRegExp = (0, superstruct_1.pattern)((0, superstruct_1.string)(), /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/);
function matchPasswords(struct) {
    return (0, superstruct_1.refine)(struct, 'PasswordMatch', (value) => value.password === value.passwordConfirmation);
}
exports.CreateUserBodyStruct = matchPasswords((0, superstruct_1.object)({
    name: (0, superstruct_1.string)(),
    email: commonStructs_1.emailRegExp,
    employeeNumber: (0, superstruct_1.nonempty)((0, superstruct_1.string)()),
    phoneNumber: commonStructs_1.phoneNumberRegExp,
    password: pwRegExp,
    passwordConfirmation: (0, superstruct_1.string)(),
    companyName: (0, superstruct_1.nonempty)((0, superstruct_1.string)()),
    companyCode: (0, superstruct_1.nonempty)((0, superstruct_1.string)()),
}));
exports.UpdateUserBodyStruct = matchPasswords((0, superstruct_1.object)({
    currentPassword: (0, superstruct_1.string)(),
    employeeNumber: (0, superstruct_1.nonempty)((0, superstruct_1.string)()),
    phoneNumber: commonStructs_1.phoneNumberRegExp,
    imageUrl: (0, superstruct_1.optional)((0, superstruct_1.string)()),
    password: (0, superstruct_1.optional)(pwRegExp),
    passwordConfirmation: (0, superstruct_1.optional)((0, superstruct_1.string)()),
}));
exports.DeleteUserParamStruct = (0, superstruct_1.object)({
    userId: commonStructs_1.integerString,
});
