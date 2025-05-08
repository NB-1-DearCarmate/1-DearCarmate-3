"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AlreadyExstError extends Error {
    constructor(modelName) {
        super(`${modelName} already exists`);
        this.name = 'AlreadyExstError';
    }
}
exports.default = AlreadyExstError;
