"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnvVarError extends Error {
    constructor() {
        super();
        this.name = 'EnvVarError';
        this.message = 'Missing Environment Variable';
    }
}
exports.default = EnvVarError;
