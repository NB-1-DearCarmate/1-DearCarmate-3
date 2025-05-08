"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnauthError extends Error {
    constructor() {
        super();
        this.name = 'UnauthError';
    }
}
exports.default = UnauthError;
