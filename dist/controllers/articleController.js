"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArticle = createArticle;
exports.getArticle = getArticle;
exports.updateArticle = updateArticle;
exports.deleteArticle = deleteArticle;
exports.getArticleList = getArticleList;
exports.createComment = createComment;
exports.getCommentList = getCommentList;
exports.likeArticle = likeArticle;
exports.dislikeArticle = dislikeArticle;
const superstruct_1 = require("superstruct");
const NotFoundError_1 = __importDefault(require("../lib/errors/NotFoundError"));
const commonStructs_1 = require("../structs/commonStructs");
const articleStructs_1 = require("../structs/articleStructs");
const commentStruct_1 = require("../structs/commentStruct");
const articleService_1 = __importDefault(require("../services/articleService"));
const commentService_1 = __importDefault(require("../services/commentService"));
const likeArticleService_1 = __importDefault(require("../services/likeArticleService"));
const AlreadyExstError_1 = __importDefault(require("../lib/errors/AlreadyExstError"));
const client_1 = require("@prisma/client");
const ArticleResDTO_1 = require("../lib/dtos/ArticleResDTO");
const CommentResDTO_1 = require("../lib/dtos/CommentResDTO");
const constants_1 = require("../config/constants");
function createArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const reqUser = req.user;
        const data = (0, superstruct_1.create)(req.body, articleStructs_1.CreateArticleBodyStruct);
        const { id: userId } = (0, superstruct_1.create)({ id: reqUser.id }, commonStructs_1.IdParamsStruct);
        const article = yield articleService_1.default.create(Object.assign(Object.assign({}, data), { userId: userId }));
        res.status(201).send(article);
    });
}
function getArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = (0, superstruct_1.create)(req.params, commonStructs_1.IdParamsStruct);
        const article = yield articleService_1.default.getById(id);
        if (!article) {
            throw new NotFoundError_1.default(articleService_1.default.getEntityName(), id);
        }
        if (!req.user) {
            res.send(article);
        }
        else {
            const reqUser = req.user;
            const { id: userId } = (0, superstruct_1.create)({ id: reqUser.id }, commonStructs_1.IdParamsStruct);
            const like = yield likeArticleService_1.default.getById(userId, id);
            res.send(new ArticleResDTO_1.ArticleWithLikeDTO(article, like));
        }
    });
}
function updateArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = (0, superstruct_1.create)(req.params, commonStructs_1.IdParamsStruct);
        const data = (0, superstruct_1.create)(req.body, articleStructs_1.UpdateArticleBodyStruct);
        const article = yield articleService_1.default.update(id, data);
        res.send(article);
    });
}
function deleteArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = (0, superstruct_1.create)(req.params, commonStructs_1.IdParamsStruct);
        yield articleService_1.default.remove(id);
        res.status(204).send();
    });
}
function getArticleList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page, pageSize, orderBy, keyword } = (0, superstruct_1.create)(req.query, articleStructs_1.GetArticleListParamsStruct);
        const search = {
            where: {
                OR: [
                    { title: { contains: keyword, mode: client_1.Prisma.QueryMode.insensitive } },
                    { content: { contains: keyword, mode: client_1.Prisma.QueryMode.insensitive } },
                ],
            },
        };
        const totalCount = yield articleService_1.default.count({ where: keyword ? search.where : {} });
        const articles = yield articleService_1.default.getList({
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: orderBy === constants_1.RECENT_STRING ? { createdAt: constants_1.DESC_STRING } : { createdAt: constants_1.ASC_STRING },
            where: keyword ? search.where : {},
        });
        res.send(new ArticleResDTO_1.ArticleListWithCountDTO(articles, totalCount));
    });
}
function createComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: articleId } = (0, superstruct_1.create)(req.params, commonStructs_1.IdParamsStruct);
        const { content } = (0, superstruct_1.create)(req.body, commentStruct_1.CreateCommentBodyStruct);
        const reqUser = req.user;
        const { id: userId } = (0, superstruct_1.create)({ id: reqUser.id }, commonStructs_1.IdParamsStruct);
        const comment = yield commentService_1.default.create({
            articleId: articleId,
            content,
            userId: userId,
        });
        res.status(201).send(comment);
    });
}
function getCommentList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: articleId } = (0, superstruct_1.create)(req.params, commonStructs_1.IdParamsStruct);
        const { cursor, limit } = (0, superstruct_1.create)(req.query, commentStruct_1.GetCommentListParamsStruct);
        const article = yield articleService_1.default.getById(articleId);
        if (!article) {
            throw new NotFoundError_1.default(articleService_1.default.getEntityName(), articleId);
        }
        const commentsWithCursor = yield commentService_1.default.getList({
            cursor: cursor ? { id: cursor } : undefined,
            take: limit + 1,
            where: { articleId },
            orderBy: { createdAt: constants_1.DESC_STRING },
        });
        const comments = commentsWithCursor.slice(0, limit);
        const cursorComment = commentsWithCursor[commentsWithCursor.length - 1];
        const nextCursor = cursorComment ? cursorComment.id : null;
        res.send(new CommentResDTO_1.CommentListWithCursorDTO(comments, nextCursor));
    });
}
function likeArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: articleId } = (0, superstruct_1.create)(req.params, commonStructs_1.IdParamsStruct);
        const reqUser = req.user;
        const { id: userId } = (0, superstruct_1.create)({ id: reqUser.id }, commonStructs_1.IdParamsStruct);
        const existedLike = yield likeArticleService_1.default.getById(userId, articleId);
        if (existedLike) {
            throw new AlreadyExstError_1.default(likeArticleService_1.default.getEntityName());
        }
        const like = yield likeArticleService_1.default.create({
            userId: userId,
            articleId: articleId,
        });
        res.send(like);
    });
}
function dislikeArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: articleId } = (0, superstruct_1.create)(req.params, commonStructs_1.IdParamsStruct);
        const reqUser = req.user;
        const { id: userId } = (0, superstruct_1.create)({ id: reqUser.id }, commonStructs_1.IdParamsStruct);
        const existedLike = yield likeArticleService_1.default.getById(userId, articleId);
        if (!existedLike) {
            throw new NotFoundError_1.default(likeArticleService_1.default.getEntityName(), userId);
        }
        yield likeArticleService_1.default.remove(userId, articleId);
        res.status(204).send();
    });
}
