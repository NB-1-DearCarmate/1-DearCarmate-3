"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentListWithCursorDTO = void 0;
class CommentListWithCursorDTO {
    constructor(comments, nextCursor) {
        this.list = comments;
        this.nextCursor = nextCursor;
    }
}
exports.CommentListWithCursorDTO = CommentListWithCursorDTO;
