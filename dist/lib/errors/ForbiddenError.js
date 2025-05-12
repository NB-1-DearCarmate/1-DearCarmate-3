"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ForbiddenError extends Error {
    constructor(modelName, targetId, userId) {
        super(`${targetId} is forbidden for ${userId} at ${modelName}`);
        this.name = 'ForbiddenError';
    }
}
exports.default = ForbiddenError;
