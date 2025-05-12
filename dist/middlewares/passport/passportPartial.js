"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatePartial = authenticatePartial;
const passport_1 = __importDefault(require("./passport"));
function isUser(user) {
    return user instanceof Object;
}
function authenticatePartial(strategyName) {
    return (req, res, next) => {
        passport_1.default.authenticate(strategyName, { session: false }, (_err, user, _info) => {
            if (isUser(user)) {
                req.user = user;
            }
            next();
        })(req, res, next);
    };
}
