"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerIdParamStruct = exports.PatchCustomerBodyStruct = exports.CreateCustomerBodyStruct = void 0;
const superstruct_1 = require("superstruct");
const commonStructs_1 = require("./commonStructs");
const AgeGroupEnum = (0, superstruct_1.union)([
    (0, superstruct_1.literal)('10대'),
    (0, superstruct_1.literal)('20대'),
    (0, superstruct_1.literal)('30대'),
    (0, superstruct_1.literal)('40대'),
    (0, superstruct_1.literal)('50대'),
    (0, superstruct_1.literal)('60대'),
    (0, superstruct_1.literal)('70대'),
    (0, superstruct_1.literal)('80대'),
]);
const RegionEnum = (0, superstruct_1.union)([
    (0, superstruct_1.literal)('서울'),
    (0, superstruct_1.literal)('경기'),
    (0, superstruct_1.literal)('인천'),
    (0, superstruct_1.literal)('강원'),
    (0, superstruct_1.literal)('충북'),
    (0, superstruct_1.literal)('충남'),
    (0, superstruct_1.literal)('세종'),
    (0, superstruct_1.literal)('대전'),
    (0, superstruct_1.literal)('전북'),
    (0, superstruct_1.literal)('전남'),
    (0, superstruct_1.literal)('광주'),
    (0, superstruct_1.literal)('경북'),
    (0, superstruct_1.literal)('경남'),
    (0, superstruct_1.literal)('대구'),
    (0, superstruct_1.literal)('울산'),
    (0, superstruct_1.literal)('부산'),
    (0, superstruct_1.literal)('제주'),
]);
exports.CreateCustomerBodyStruct = (0, superstruct_1.object)({
    name: (0, superstruct_1.nonempty)((0, superstruct_1.string)()),
    gender: (0, superstruct_1.nonempty)((0, superstruct_1.string)()),
    phoneNumber: commonStructs_1.phoneNumberRegExp,
    ageGroup: AgeGroupEnum,
    region: RegionEnum,
    email: commonStructs_1.emailRegExp,
    memo: (0, superstruct_1.optional)((0, superstruct_1.string)()),
});
exports.PatchCustomerBodyStruct = (0, superstruct_1.object)({
    name: (0, superstruct_1.optional)((0, superstruct_1.string)()),
    gender: (0, superstruct_1.optional)((0, superstruct_1.string)()),
    phoneNumber: commonStructs_1.phoneNumberRegExp,
    ageGroup: (0, superstruct_1.optional)(AgeGroupEnum),
    region: (0, superstruct_1.optional)(RegionEnum),
    email: commonStructs_1.emailRegExp,
    memo: (0, superstruct_1.optional)((0, superstruct_1.string)()),
});
exports.CustomerIdParamStruct = (0, superstruct_1.object)({
    customerId: commonStructs_1.integerString,
});
