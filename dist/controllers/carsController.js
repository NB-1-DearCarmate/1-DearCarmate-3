"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.createCar = createCar;
exports.getCarList = getCarList;
exports.updateCar = updateCar;
exports.deleteCar = deleteCar;
exports.getCar = getCar;
exports.getCarModelList = getCarModelList;
exports.carUpload = carUpload;
const superstruct_1 = require("superstruct");
const carsStructs_1 = require("../structs/carsStructs");
const carsService = __importStar(require("../services/carsService"));
const carDTO_1 = require("../lib/dtos/carDTO");
const commonStructs_1 = require("../structs/commonStructs");
const BadRequestError_1 = __importDefault(require("../lib/errors/BadRequestError"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const fs_1 = __importDefault(require("fs"));
/**
 * @openapi
 * /cars:
 *   post:
 *     summary: 차량 등록
 *     description: 차량 정보를 등록합니다. 요청된 차량 정보는 해당 사용자가 속한 회사에 등록됩니다.
 *     tags:
 *       - Car
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carNumber:
 *                 type: string
 *                 example: "12가1234"
 *               manufacturer:
 *                 type: string
 *                 example: "Hyundai"
 *               model:
 *                 type: string
 *                 example: "Sonata 2023"
 *               manufacturingYear:
 *                 type: integer
 *                 example: 2020
 *               mileage:
 *                 type: integer
 *                 example: 15000
 *               price:
 *                 type: integer
 *                 example: 20000000
 *               accidentCount:
 *                 type: integer
 *                 example: 1
 *               explanation:
 *                 type: string
 *                 example: "좋은 상태의 차량입니다."
 *               accidentDetails:
 *                 type: string
 *                 example: "소소한 교차로 접촉사고"
 *     responses:
 *       201:
 *         description: 차량 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarResponseDTO'
 *       400:
 *         description: 잘못된 요청. 요청 본문이 유효하지 않거나 필수 필드가 누락된 경우
 *       401:
 *         description: 인증 실패. 유효하지 않은 액세스 토큰
 *       500:
 *         description: 서버 오류. 차량 등록 처리 중 오류 발생
 */
function createCar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const reqUser = req.user;
        const data = (0, superstruct_1.create)(req.body, carsStructs_1.CreateCarBodyStruct);
        const createdCar = yield carsService.createCar(data, reqUser.companyId);
        res.status(201).json(new carDTO_1.CarResponseDTO(createdCar));
    });
}
/**
 * @openapi
 * /cars:
 *   get:
 *     summary: 차량 목록 조회
 *     description: 차량 목록을 조회합니다.
 *     tags:
 *       - Car
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: number
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: number
 *           default: 10
 *         description: 페이지당 항목 수
 *     responses:
 *       200:
 *         description: 차량 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: number
 *                   description: 현재 페이지 번호
 *                 totalPages:
 *                   type: number
 *                   description: 전체 페이지 수
 *                 totalItemCount:
 *                   type: number
 *                   description: 전체 항목 수
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: 차량 ID
 *                       model:
 *                         type: string
 *                         description: 차량 모델
 *                       manufacturer:
 *                         type: string
 *                         description: 제조사
 *                       year:
 *                         type: number
 *                         description: 제조 연도
 *                       price:
 *                         type: number
 *                         description: 가격
 *                       status:
 *                         type: string
 *                         description: 차량 상태
 *               required:
 *                 - currentPage
 *                 - totalPages
 *                 - totalItemCount
 *                 - data
 */
function getCarList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = (0, superstruct_1.create)(req.query, carsStructs_1.GetCarListParamsStruct);
        const result = yield carsService.getCarList(params);
        res.send(new carDTO_1.ResponseCarListDTO(params.page, params.pageSize, result));
    });
}
/**
 * @openapi
 * /cars/{carId}:
 *   patch:
 *     summary: 차량 정보 수정
 *     description: 차량 정보를 수정합니다.
 *     tags:
 *       - Car
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         schema:
 *           type: number
 *         description: 수정할 차량의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carNumber:
 *                 type: string
 *                 description: 차량 번호, 선택사항
 *               manufacturingYear:
 *                 type: number
 *                 description: 제조 연도, 선택사항
 *               mileage:
 *                 type: number
 *                 description: 차량의 주행 거리, 선택사항
 *               price:
 *                 type: number
 *                 description: 차량 가격, 선택사항
 *               accidentCount:
 *                 type: number
 *                 description: 차량의 사고 횟수, 선택사항
 *               explanation:
 *                 type: string
 *                 description: 차량 설명, 선택사항
 *               accidentDetails:
 *                 type: string
 *                 description: 사고 세부 사항, 선택사항
 *     responses:
 *       200:
 *         description: 차량 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarResponseDTO'
 */
function updateCar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { carId } = (0, superstruct_1.create)(req.params, commonStructs_1.CarIdParamsStruct);
        const data = (0, superstruct_1.create)(req.body, carsStructs_1.UpdateCarBodyStruct);
        const updatedCar = yield carsService.updateCar(carId, data);
        res.send(new carDTO_1.CarResponseDTO(updatedCar));
    });
}
/**
 * @openapi
 * /cars/{carId}:
 *   delete:
 *     summary: 차량 삭제
 *     description: 차량을 삭제합니다.
 *     tags:
 *       - Car
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         schema:
 *           type: number
 *         description: 삭제할 차량의 ID
 *     responses:
 *       200:
 *         description: 차량 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 차량 삭제 성공
 */
function deleteCar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { carId } = (0, superstruct_1.create)(req.params, commonStructs_1.CarIdParamsStruct);
        yield carsService.deleteCar(carId);
        res.status(200).send({ message: '차량 삭제 성공' });
    });
}
/**
 * @openapi
 * /cars/{carId}:
 *   get:
 *     summary: 차량 정보 조회
 *     description: 특정 차량의 정보를 조회합니다.
 *     tags:
 *       - Car
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         schema:
 *           type: number
 *         description: 조회할 차량의 ID
 *     responses:
 *       200:
 *         description: 차량 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CarResponseDTO'
 */
function getCar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { carId } = (0, superstruct_1.create)(req.params, commonStructs_1.CarIdParamsStruct);
        const car = yield carsService.getCar(carId);
        res.send(new carDTO_1.CarResponseDTO(car));
    });
}
/**
 * @openapi
 * /cars/models:
 *   get:
 *     summary: 차량 모델 목록 조회
 *     description: 차량 모델 목록을 조회합니다.
 *     tags:
 *       - Car
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 차량 모델 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseCarModelListDTO'
 */
function getCarModelList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield carsService.getCarModelList();
        res.send(new carDTO_1.ResponseCarModelListDTO(result));
    });
}
/**
 * @openapi
 * /cars/upload:
 *   post:
 *     summary: 차량 정보 일괄 업로드
 *     description: CSV 파일을 통해 차량 정보를 일괄적으로 업로드합니다.
 *     tags:
 *       - Car
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: 업로드할 CSV 파일
 *     responses:
 *       200:
 *         description: 차량 정보 일괄 업로드 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 성공적으로 등록되었습니다
 *       400:
 *         description: 잘못된 요청. CSV 파일이 누락되었거나 유효하지 않은 경우
 *       401:
 *         description: 인증 실패. 유효하지 않은 액세스 토큰
 *       500:
 *         description: 서버 오류. 차량 정보 업로드 처리 중 오류 발생
 */
function carUpload(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.file) {
            throw new BadRequestError_1.default('CSV 파일이 업로드되지 않았습니다.');
        }
        const filePath = req.file.path;
        try {
            const reqUser = req.user;
            const jsonArray = yield (0, csvtojson_1.default)().fromFile(filePath);
            const parsedArray = jsonArray.map((item) => ({
                carNumber: item.carNumber,
                manufacturer: item.manufacturer,
                model: item.model,
                manufacturingYear: parseInt(item.manufacturingYear, 10),
                mileage: parseInt(item.mileage, 10),
                price: parseInt(item.price, 10),
                accidentCount: parseInt(item.accidentCount, 10),
                explanation: item.explanation,
                accidentDetails: item.accidentDetails,
            }));
            const validatedData = (0, superstruct_1.create)(parsedArray, carsStructs_1.BulkCreateCarBodyStruct);
            const dataWithCompanyId = validatedData.map((item) => (Object.assign(Object.assign({}, item), { companyId: reqUser.companyId })));
            yield carsService.carUpload(dataWithCompanyId);
            res.status(200).send({ message: '성공적으로 등록되었습니다' });
        }
        finally {
            fs_1.default.unlink(filePath, () => { });
        }
    });
}
