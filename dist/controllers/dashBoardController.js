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
exports.getDashBoard = void 0;
const dashBoardService_1 = __importDefault(require("../services/dashBoardService"));
const dashBoardDTO_1 = require("../lib/dtos/dashBoardDTO");
/**
 * @openapi
 * /dashboard:
 *   get:
 *     summary: 대시보드 데이터 조회
 *     description: 로그인한 사용자의 회사에 대한 대시보드 데이터를 조회합니다.
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 대시보드 데이터 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseDashBoardDTO'
 *             example:
 *               monthlySales: 5000000
 *               lastMonthSales: 4500000
 *               growthRate: 11
 *               proceedingContractsCount: 200
 *               completedContractsCount: 1500
 *               contractsByCarType:
 *                 - carType: "SUV"
 *                   count: 300
 *                 - carType: "Sedan"
 *                   count: 500
 *               salesByCarType:
 *                 - carType: "SUV"
 *                   count: 1500000
 *                 - carType: "Sedan"
 *                   count: 3500000
 *       401:
 *         description: 인증되지 않은 사용자입니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
const getDashBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.user;
    const dashBoardData = yield dashBoardService_1.default.getDashBoardData(reqUser.companyId);
    res.send(new dashBoardDTO_1.ResponseDashBoardDTO(dashBoardData));
});
exports.getDashBoard = getDashBoard;
