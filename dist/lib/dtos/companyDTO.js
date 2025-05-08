"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseCompanyUserListDTO = exports.ResponseCompanyListDTO = exports.ResponseCompanyDTO = void 0;
class ResponseCompanyDTO {
    constructor(company) {
        var _a, _b;
        this.id = company.id;
        this.companyName = company.companyName;
        this.companyCode = company.companyCode;
        this.userCount = (_b = (_a = company._count) === null || _a === void 0 ? void 0 : _a.users) !== null && _b !== void 0 ? _b : 0;
    }
}
exports.ResponseCompanyDTO = ResponseCompanyDTO;
class ResponseCompanyListDTO {
    constructor(page, pageSize, result) {
        this.currentPage = page;
        this.totalPages = Math.ceil(result.totalItemCount / pageSize);
        this.totalItemCount = result.totalItemCount;
        this.data = result.companies.map((company) => new ResponseCompanyDTO(company));
    }
}
exports.ResponseCompanyListDTO = ResponseCompanyListDTO;
class ResponseCompanyUserDTO {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.employeeNumber = user.employeeNumber;
        this.phoneNumber = user.phoneNumber;
        this.company = {
            companyName: user.company.companyName,
        };
    }
}
class ResponseCompanyUserListDTO {
    constructor(page, pageSize, users, totalItemCount) {
        this.currentPage = page;
        this.totalPages = Math.ceil(totalItemCount / pageSize);
        this.totalItemCount = totalItemCount;
        this.data = users.map((user) => new ResponseCompanyUserDTO(user));
    }
}
exports.ResponseCompanyUserListDTO = ResponseCompanyUserListDTO;
