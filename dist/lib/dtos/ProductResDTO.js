"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductListWithCountDTO = exports.ProductWithLikeDTO = void 0;
class ProductWithLikeDTO {
    constructor(product, isLiked) {
        Object.assign(this, product);
        this.isLiked = !!isLiked;
    }
}
exports.ProductWithLikeDTO = ProductWithLikeDTO;
class ProductListWithCountDTO {
    constructor(products, totalCount) {
        this.list = products;
        this.totalCount = totalCount;
    }
}
exports.ProductListWithCountDTO = ProductListWithCountDTO;
