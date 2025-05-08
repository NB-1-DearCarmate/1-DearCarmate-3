"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDTO = exports.ResponseUserDTO = void 0;
const client_1 = require("@prisma/client");
const authDTO_1 = require("./authDTO");
class ResponseUserDTO {
    constructor(user) {
        var _a;
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.employeeNumber = user.employeeNumber;
        this.phoneNumber = user.phoneNumber;
        this.imageUrl = (_a = user.imageUrl) !== null && _a !== void 0 ? _a : '';
        this.isAdmin = user.role === client_1.USER_ROLE.ADMIN;
        this.company = new authDTO_1.CompanyDTO(user.companyId);
    }
}
exports.ResponseUserDTO = ResponseUserDTO;
class CreateUserDTO {
    constructor(user, companyId, hashedPassword) {
        this.role = client_1.USER_ROLE.EMPLOYEE;
        this.name = user.name;
        this.email = user.email;
        this.employeeNumber = user.employeeNumber;
        this.phoneNumber = user.phoneNumber;
        this.encryptedPassword = hashedPassword;
        this.companyId = companyId;
    }
}
exports.CreateUserDTO = CreateUserDTO;
