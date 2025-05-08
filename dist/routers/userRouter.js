"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const withAsync_1 = require("../lib/withAsync");
const userController_1 = require("../controllers/userController");
const passport_1 = __importDefault(require("../middlewares/passport/passport"));
const constants_1 = require("../config/constants");
const usersRouter = express_1.default.Router();
usersRouter.get('/me', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(userController_1.getInfo));
usersRouter.patch('/me', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(userController_1.editInfo));
usersRouter.delete('/me', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(userController_1.withDraw));
usersRouter.delete('/:userId', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), (0, withAsync_1.withAsync)(userController_1.deleteUser));
usersRouter.post('/', (0, withAsync_1.withAsync)(userController_1.createUser));
exports.default = usersRouter;
