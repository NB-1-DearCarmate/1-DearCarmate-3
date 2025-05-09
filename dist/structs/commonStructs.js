"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchParamsStruct = exports.PageParamsStruct = exports.CarIdParamsStruct = exports.integerString = exports.phoneNumberRegExp = exports.emailRegExp = void 0;
const superstruct_1 = require("superstruct");
exports.emailRegExp = (0, superstruct_1.pattern)((0, superstruct_1.string)(), 
// /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
/^[\w.-]+@([\w.-]+\.)+[\w]{2,4}$/i);
exports.phoneNumberRegExp = (0, superstruct_1.pattern)((0, superstruct_1.string)(), /^\d{2,3}-\d{3,4}-\d{4}$/);
exports.integerString = (0, superstruct_1.coerce)((0, superstruct_1.integer)(), (0, superstruct_1.string)(), (value) => parseInt(value));
exports.CarIdParamsStruct = (0, superstruct_1.object)({
    carId: exports.integerString,
});
const urlRegExp = /^(https?:\/\/)/;
exports.PageParamsStruct = (0, superstruct_1.object)({
    page: (0, superstruct_1.defaulted)(exports.integerString, 1),
    pageSize: (0, superstruct_1.defaulted)(exports.integerString, 10),
    searchBy: (0, superstruct_1.optional)((0, superstruct_1.string)()),
    keyword: (0, superstruct_1.optional)((0, superstruct_1.string)()),
});
exports.SearchParamsStruct = (0, superstruct_1.object)({
    searchBy: (0, superstruct_1.nonempty)((0, superstruct_1.string)()),
    keyword: (0, superstruct_1.optional)((0, superstruct_1.string)()),
});
