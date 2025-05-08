"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const withAsync_1 = require("../lib/withAsync");
const customerController_1 = require("../controllers/customerController");
const passport_1 = __importDefault(require("passport"));
const constants_1 = require("../config/constants");
const fileUploader_1 = require("../lib/fileUploader");
const customerRouter = express_1.default.Router();
customerRouter.post('/upload', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, fileUploader_1.uploadHandler)({
    allowedTypes: ['text/csv', 'application/vnd.ms-excel'],
    memoryFlag: true,
}).single('file'), (0, withAsync_1.withAsync)(customerController_1.postCustomers));
customerRouter.get('/:customerId', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(customerController_1.getCustomer));
customerRouter.patch('/:customerId', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(customerController_1.patchCustomer));
customerRouter.delete('/:customerId', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(customerController_1.deleteCustomer));
customerRouter.get('/', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(customerController_1.getCustomerList));
customerRouter.post('/', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(customerController_1.postCustomer));
exports.default = customerRouter;
