"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkCreateCarBodyStruct = exports.UpdateCarBodyStruct = exports.GetCarListParamsStruct = exports.CreateCarBodyStruct = void 0;
const superstruct_1 = require("superstruct");
const commonStructs_1 = require("./commonStructs");
exports.CreateCarBodyStruct = (0, superstruct_1.object)({
    carNumber: (0, superstruct_1.nonempty)((0, superstruct_1.string)()),
    manufacturer: (0, superstruct_1.nonempty)((0, superstruct_1.string)()),
    model: (0, superstruct_1.nonempty)((0, superstruct_1.string)()),
    manufacturingYear: (0, superstruct_1.min)((0, superstruct_1.integer)(), 0),
    mileage: (0, superstruct_1.min)((0, superstruct_1.integer)(), 0),
    price: (0, superstruct_1.min)((0, superstruct_1.integer)(), 0),
    accidentCount: (0, superstruct_1.min)((0, superstruct_1.integer)(), 0),
    explanation: (0, superstruct_1.string)(),
    accidentDetails: (0, superstruct_1.string)(),
});
exports.GetCarListParamsStruct = (0, superstruct_1.assign)(commonStructs_1.PageParamsStruct, (0, superstruct_1.object)({
    status: (0, superstruct_1.optional)((0, superstruct_1.enums)(['possession', 'contractProceeding', 'contractCompleted'])),
    searchBy: (0, superstruct_1.optional)((0, superstruct_1.enums)(['companyName', 'name', 'email'])),
    keyword: (0, superstruct_1.optional)((0, superstruct_1.nonempty)((0, superstruct_1.string)())),
}));
exports.UpdateCarBodyStruct = (0, superstruct_1.partial)(exports.CreateCarBodyStruct);
exports.BulkCreateCarBodyStruct = (0, superstruct_1.array)(exports.CreateCarBodyStruct);
