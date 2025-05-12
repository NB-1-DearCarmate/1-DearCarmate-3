"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleListWithCountDTO = exports.ArticleWithLikeDTO = void 0;
class ArticleWithLikeDTO {
    constructor(article, isLiked) {
        Object.assign(this, Object.assign({}, article));
        this.isLiked = !!isLiked;
    }
}
exports.ArticleWithLikeDTO = ArticleWithLikeDTO;
class ArticleListWithCountDTO {
    constructor(articles, totalCount) {
        this.list = articles;
        this.totalCount = totalCount;
    }
}
exports.ArticleListWithCountDTO = ArticleListWithCountDTO;
