"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmptyUploadError extends Error {
    constructor() {
        super();
        this.name = 'EmptyUploadError';
    }
}
exports.default = EmptyUploadError;
