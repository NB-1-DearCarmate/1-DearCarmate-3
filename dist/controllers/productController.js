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
exports.createProduct = createProduct;
exports.getProduct = getProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.getProductList = getProductList;
exports.createComment = createComment;
exports.getCommentList = getCommentList;
exports.likeProduct = likeProduct;
exports.dislikeProduct = dislikeProduct;
exports.getOwnProducts = getOwnProducts;
exports.getLikedProducts = getLikedProducts;
const superstruct_1 = require("superstruct");
const NotFoundError_1 = __importDefault(require("../lib/errors/NotFoundError"));
const commonStructs_1 = require("../structs/commonStructs");
const productStruct_1 = require("../structs/productStruct");
const commentStruct_1 = require("../structs/commentStruct");
const productService_1 = __importDefault(require("../services/productService"));
const commentService_1 = __importDefault(require("../services/commentService"));
const likeProductService_1 = __importDefault(require("../services/likeProductService"));
const AlreadyExstError_1 = __importDefault(require("../lib/errors/AlreadyExstError"));
const client_1 = require("@prisma/client");
const ProductResDTO_1 = require("../lib/dtos/ProductResDTO");
const CommentResDTO_1 = require("../lib/dtos/CommentResDTO");
const constants_1 = require("../config/constants");
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = (0, superstruct_1.create)(req.body, productStruct_1.CreateProductBodyStruct);
        const reqUser = req.user;
        const { id: userId } = (0, superstruct_1.create)({ id: reqUser.id }, commonStructs_1.IdParamsStruct);
        const product = yield productService_1.default.create(Object.assign(Object.assign({}, data), { userId: userId }));
        res.status(201).send(product);
    });
}
function getProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = (0, superstruct_1.create)(req.params, commonStructs_1.IdParamsStruct);
        const product = yield productService_1.default.getById(id);
        if (!product) {
            throw new NotFoundError_1.default(productService_1.default.getEntityName(), id);
        }
        if (!req.user) {
            res.send(product);
        }
        else {
            const reqUser = req.user;
            const { id: userId } = (0, superstruct_1.create)({ id: reqUser.id }, commonStructs_1.IdParamsStruct);
            const like = yield likeProductService_1.default.getById(userId, id);
            res.send(new ProductResDTO_1.ProductWithLikeDTO(product, like));
        }
    });
}
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = (0, superstruct_1.create)(req.params, commonStructs_1.IdParamsStruct);
        const data = (0, superstruct_1.create)(req.body, productStruct_1.UpdateProductBodyStruct);
        const updatedProduct = yield productService_1.default.update(id, data);
        res.send(updatedProduct);
    });
}
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = (0, superstruct_1.create)(req.params, commonStructs_1.IdParamsStruct);
        yield productService_1.default.remove(id);
        res.status(204).send();
    });
}
function getProductList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page, pageSize, orderBy, keyword } = (0, superstruct_1.create)(req.query, productStruct_1.GetProductListParamsStruct);
        const search = {
            where: {
                OR: [
                    { name: { contains: keyword, mode: client_1.Prisma.QueryMode.insensitive } },
                    { description: { contains: keyword, mode: client_1.Prisma.QueryMode.insensitive } },
                ],
            },
        };
        const totalCount = yield productService_1.default.count({ where: keyword ? search.where : {} });
        const products = yield productService_1.default.getList({
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: orderBy === constants_1.RECENT_STRING ? { id: constants_1.DESC_STRING } : { id: constants_1.ASC_STRING },
            where: keyword ? search.where : {},
        });
        res.send(new ProductResDTO_1.ProductListWithCountDTO(products, totalCount));
    });
}
function createComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: productId } = (0, superstruct_1.create)(req.params, commonStructs_1.IdParamsStruct);
        const { content } = (0, superstruct_1.create)(req.body, commentStruct_1.CreateCommentBodyStruct);
        const reqUser = req.user;
        const { id: userId } = (0, superstruct_1.create)({ id: reqUser.id }, commonStructs_1.IdParamsStruct);
        const comment = yield commentService_1.default.create({
            productId: productId,
            content,
            userId: userId,
        });
        res.status(201).send(comment);
    });
}
function getCommentList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: productId } = (0, superstruct_1.create)(req.params, commonStructs_1.IdParamsStruct);
        const { cursor, limit } = (0, superstruct_1.create)(req.query, commentStruct_1.GetCommentListParamsStruct);
        const existingProduct = yield productService_1.default.getById(productId);
        if (!existingProduct) {
            throw new NotFoundError_1.default(productService_1.default.getEntityName(), productId);
        }
        const commentsWithCursorComment = yield commentService_1.default.getList({
            cursor: cursor ? { id: cursor } : undefined,
            take: limit + 1,
            where: { productId },
        });
        const comments = commentsWithCursorComment.slice(0, limit);
        const cursorComment = commentsWithCursorComment[comments.length - 1];
        const nextCursor = cursorComment ? cursorComment.id : null;
        res.send(new CommentResDTO_1.CommentListWithCursorDTO(comments, nextCursor));
    });
}
function likeProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: productId } = (0, superstruct_1.create)(req.params, commonStructs_1.IdParamsStruct);
        const reqUser = req.user;
        const { id: userId } = (0, superstruct_1.create)({ id: reqUser.id }, commonStructs_1.IdParamsStruct);
        const existedLike = yield likeProductService_1.default.getById(userId, productId);
        if (existedLike) {
            throw new AlreadyExstError_1.default(likeProductService_1.default.getEntityName());
        }
        const like = yield likeProductService_1.default.create({
            userId: userId,
            productId: productId,
        });
        res.send(like);
    });
}
function dislikeProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: productId } = (0, superstruct_1.create)(req.params, commonStructs_1.IdParamsStruct);
        const reqUser = req.user;
        const { id: userId } = (0, superstruct_1.create)({ id: reqUser.id }, commonStructs_1.IdParamsStruct);
        const existedLike = yield likeProductService_1.default.getById(userId, productId);
        if (!existedLike) {
            throw new NotFoundError_1.default(likeProductService_1.default.getEntityName(), userId);
        }
        yield likeProductService_1.default.remove(userId, productId);
        res.status(204).send();
    });
}
function getOwnProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page, pageSize, orderBy } = (0, superstruct_1.create)(req.query, productStruct_1.GetProductListParamsStruct);
        const reqUser = req.user;
        const { id: userId } = (0, superstruct_1.create)({ id: reqUser.id }, commonStructs_1.IdParamsStruct);
        const totalCount = yield productService_1.default.count({ where: { userId: userId } });
        const products = yield productService_1.default.getList({
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: orderBy === constants_1.RECENT_STRING ? { createdAt: constants_1.DESC_STRING } : { id: constants_1.ASC_STRING },
            where: {
                userId: userId,
            },
        });
        res.send(new ProductResDTO_1.ProductListWithCountDTO(products, totalCount));
    });
}
function getLikedProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page, pageSize, orderBy } = (0, superstruct_1.create)(req.query, productStruct_1.GetProductListParamsStruct);
        const reqUser = req.user;
        const { id: userId } = (0, superstruct_1.create)({ id: reqUser.id }, commonStructs_1.IdParamsStruct);
        const likes = yield likeProductService_1.default.getList({
            where: {
                userId: userId,
            },
            select: { productId: true },
        });
        const likedProductIds = likes
            .map((like) => like.productId)
            .filter((element) => element !== null);
        const totalCount = likedProductIds.length;
        const likedProducts = yield productService_1.default.getList({
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: orderBy === constants_1.RECENT_STRING ? { createdAt: constants_1.DESC_STRING } : { id: constants_1.ASC_STRING },
            where: {
                id: {
                    in: likedProductIds,
                },
            },
        });
        res.send(new ProductResDTO_1.ProductListWithCountDTO(likedProducts, totalCount));
    });
}
