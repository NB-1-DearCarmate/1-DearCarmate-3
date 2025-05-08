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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const constants_1 = require("../config/constants");
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const NotFoundError_1 = __importDefault(require("../lib/errors/NotFoundError"));
const UnauthError_1 = __importDefault(require("../lib/errors/UnauthError"));
const userDTO_1 = require("../lib/dtos/userDTO");
const searchCondition_1 = require("../lib/searchCondition");
function hashingPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.hash(password, 10);
    });
}
function createUser(data, companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield hashingPassword(data.password);
        const createdUser = yield userRepository_1.default.create(new userDTO_1.CreateUserDTO(data, companyId, hashedPassword));
        return filterSensitiveUserData(createdUser);
    });
}
function authenticateUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userRepository_1.default.findByEmail(email);
        if (!user) {
            throw new UnauthError_1.default();
        }
        yield verifyPassword(password, user.encryptedPassword);
        return filterSensitiveUserData(user);
    });
}
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userRepository_1.default.findById(id);
        if (!user) {
            throw new NotFoundError_1.default('user', id);
        }
        return filterSensitiveUserData(user);
    });
}
function getCompanyUsers(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchCondition = (0, searchCondition_1.buildSearchCondition)(params, ['companyName', 'email', 'name']);
        const where = searchCondition.whereCondition;
        const prismaParams = Object.assign(Object.assign({}, searchCondition.pageCondition), { include: {
                company: {
                    select: { companyName: true },
                },
            }, where });
        const users = yield userRepository_1.default.findMany(prismaParams);
        const totalItemCount = yield userRepository_1.default.getCount({ where });
        return { users, totalItemCount };
    });
}
function getCompanyIdById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userRepository_1.default.findCompanyIdbyUserId(userId);
        if (!user) {
            throw new NotFoundError_1.default('user', userId);
        }
        return user.companyId;
    });
}
function updateUser(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userRepository_1.default.findById(id);
        const { currentPassword, password, passwordConfirmation } = data, rest = __rest(data, ["currentPassword", "password", "passwordConfirmation"]);
        yield verifyPassword(currentPassword, user.encryptedPassword);
        let hashedPassword = null;
        if (password) {
            hashedPassword = yield hashingPassword(password);
        }
        const updatedUser = yield userRepository_1.default.update(id, Object.assign(Object.assign({}, rest), (hashedPassword && { encryptedPassword: hashedPassword })));
        return filterSensitiveUserData(updatedUser);
    });
}
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield userRepository_1.default.remove(id);
    });
}
function refreshToken(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userRepository_1.default.findById(userId);
        if (!user) {
            throw new UnauthError_1.default();
        }
        const accessToken = createToken(user);
        const newRefreshToken = createToken(user, 'refresh');
        return { accessToken, newRefreshToken };
    });
}
function verifyPassword(inputPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isValid = yield bcrypt_1.default.compare(inputPassword, savedPassword);
        if (!isValid) {
            throw new UnauthError_1.default();
        }
    });
}
function filterSensitiveUserData(user) {
    const { encryptedPassword } = user, rest = __rest(user, ["encryptedPassword"]);
    const omitedUser = rest;
    return omitedUser;
}
function createToken(authedUser, type) {
    const payload = { userId: authedUser.id, role: authedUser.role };
    const options = {
        expiresIn: type === 'refresh' ? '7d' : '1h',
    };
    const token = jsonwebtoken_1.default.sign(payload, constants_1.JWT_SECRET, options);
    return token;
}
exports.default = {
    createUser,
    getUser: authenticateUser,
    getUserById,
    getCompanyIdById,
    updateUser,
    deleteUser,
    getCompanyUsers,
    createToken,
    refreshToken,
};
