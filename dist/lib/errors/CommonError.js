"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommonError extends Error {
    constructor(message, code) {
        super();
        this.name = 'CommonError';
        this.message = message;
        this.status = code;
    }
}
exports.default = CommonError;
