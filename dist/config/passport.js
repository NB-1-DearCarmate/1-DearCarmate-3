"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const localStrategy_1 = __importDefault(require("../middlewares/passport/localStrategy"));
const jwtStrategy_1 = __importDefault(require("../middlewares/passport/jwtStrategy"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const constants_1 = require("./constants");
const UnauthError_1 = __importDefault(require("../lib/errors/UnauthError"));
passport_1.default.use(constants_1.LOCAL_STRING, localStrategy_1.default);
passport_1.default.use(constants_1.ACCESS_TOKEN_STRATEGY, jwtStrategy_1.default.accessTokenStrategy);
passport_1.default.use(constants_1.REFRESH_TOKEN_STRATEGY, jwtStrategy_1.default.refreshTokenStrategy);
const NUMBER_TYPE = typeof 0;
function isUserWithId(user) {
    return (user instanceof Object &&
        constants_1.ID_STRING in user &&
        typeof user.id === NUMBER_TYPE);
}
passport_1.default.serializeUser((user, done) => {
    if (isUserWithId(user)) {
        done(null, user.id);
    }
    else {
        done(new UnauthError_1.default());
    }
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository_1.default.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error);
    }
}));
exports.default = passport_1.default;
