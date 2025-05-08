"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractCreateStruct = void 0;
const superstruct_1 = require("superstruct");
exports.ContractCreateStruct = (0, superstruct_1.object)({
    customerId: (0, superstruct_1.number)(),
    carId: (0, superstruct_1.number)(),
    userId: (0, superstruct_1.number)(),
    companyId: (0, superstruct_1.number)(),
    contractPrice: (0, superstruct_1.number)(),
    status: (0, superstruct_1.optional)((0, superstruct_1.string)()),
    resolutionDate: (0, superstruct_1.optional)((0, superstruct_1.string)()),
    meetings: (0, superstruct_1.array)((0, superstruct_1.object)({
        time: (0, superstruct_1.string)(),
    })),
});
