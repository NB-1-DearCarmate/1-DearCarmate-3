"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const withAsync_1 = require("../lib/withAsync");
const commentController_1 = require("../controllers/commentController");
const passport_1 = __importDefault(require("../middlewares/passport/passport"));
const commentAuth_1 = __importDefault(require("../middlewares/commentAuth"));
const constants_1 = require("../config/constants");
const commentsRouter = express_1.default.Router();
commentsRouter.patch('/:id', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), commentAuth_1.default.verifyCommentOwner, (0, withAsync_1.withAsync)(commentController_1.updateComment));
commentsRouter.delete('/:id', passport_1.default.authenticate(constants_1.ACCESS_TOKEN_STRATEGY, { session: false }), commentAuth_1.default.verifyCommentOwner, (0, withAsync_1.withAsync)(commentController_1.deleteComment));
exports.default = commentsRouter;
