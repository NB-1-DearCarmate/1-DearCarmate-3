"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginResponseDTO = exports.CompanyDTO = void 0;
const userDTO_1 = require("./userDTO");
class CompanyDTO {
    constructor(companyCode) {
        this.companyCode = companyCode.toString();
    }
}
exports.CompanyDTO = CompanyDTO;
class LoginResponseDTO {
    constructor(user, accessToken, refreshToken) {
        this.user = new userDTO_1.ResponseUserDTO(user);
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
exports.LoginResponseDTO = LoginResponseDTO;
