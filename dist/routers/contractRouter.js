"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const withAsync_1 = require("../lib/withAsync");
const contractController_1 = __importDefault(require("../controllers/contractController"));
const passport_1 = __importDefault(require("passport"));
const constants_1 = require("../config/constants");
const router = express_1.default.Router();
router.get('/customers', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(contractController_1.default.getCustomerDropdown));
router.get('/users', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(contractController_1.default.getUserDropdown));
router.get('/cars', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(contractController_1.default.getCarDropdown));
router.patch('/:contractId', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(contractController_1.default.updateContract));
router.delete('/:contractId', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(contractController_1.default.deleteContract));
router.get('/', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(contractController_1.default.getAllContracts));
router.post('/', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(contractController_1.default.createContract));
exports.default = router;
