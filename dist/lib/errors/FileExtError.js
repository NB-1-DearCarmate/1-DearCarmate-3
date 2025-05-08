"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileExtError extends Error {
    constructor() {
        super();
        this.name = 'FileExtError';
    }
}
exports.default = FileExtError;
