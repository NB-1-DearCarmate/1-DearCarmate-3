"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSearchCondition = buildSearchCondition;
function buildSearchCondition(params, args) {
    const pageCondition = {
        skip: (params.page - 1) * params.pageSize,
        take: params.pageSize,
    };
    let whereCondition = {};
    if (params.keyword && params.searchBy && args.includes(params.searchBy)) {
        whereCondition = {
            [params.searchBy]: {
                contains: params.keyword,
                mode: 'insensitive',
            },
        };
    }
    return {
        whereCondition,
        pageCondition,
    };
}
