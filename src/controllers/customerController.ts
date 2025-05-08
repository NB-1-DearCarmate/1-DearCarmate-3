import { USER_ROLE } from '@prisma/client';
import { OmittedUser } from '../types/OmittedUser';
import { RequestHandler } from 'express';
import UnauthError from '../lib/errors/UnauthError';
import customerService from '../services/customerService';
import {
  CreateCustomerBodyStruct,
  CustomerIdParamStruct,
  PatchCustomerBodyStruct,
} from '../structs/customerStructs';
import { create } from 'superstruct';
import { PageParamsStruct } from '../structs/commonStructs';
import {
  CreateCustomerDTO,
  UpdateCustomerDTO,
  ResponseCustomerDTO,
  ResponseCustomerListDTO,
} from '../lib/dtos/customerDTO';
import { parse } from 'csv-parse/sync';
import { StructError } from 'superstruct';
import BadRequestError from '../lib/errors/BadRequestError';

/**
 * @openapi
 * /customers/{customerId}:
 *   get:
 *     summary: 고객 상세 조회
 *     description: 고객 ID를 통해 특정 고객 정보를 조회합니다. 직원 권한이 필요하며, 같은 회사 소속 고객만 조회할 수 있습니다.
 *     tags:
 *       - Customer
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: number
 *         description: 조회할 고객의 ID
 *     responses:
 *       200:
 *         description: 고객 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseCustomerDTO'
 *       401:
 *         description: 인증 실패 또는 권한이 없는 사용자입니다.
 *       404:
 *         description: 고객을 찾을 수 없습니다.
 */
export const getCustomer: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.EMPLOYEE) {
    throw new UnauthError();
  }
  const { customerId } = create(req.params, CustomerIdParamStruct);
  const customer = await customerService.getCustomer(customerId);
  if (reqUser.companyId !== customer.companyId) {
    throw new UnauthError();
  }
  res.send(new ResponseCustomerDTO(customer));
};

/**
 * @openapi
 * /customers:
 *   get:
 *     summary: 고객 목록 조회
 *     description: 페이지 정보를 기반으로 고객 목록을 조회합니다. 직원 또는 대표 권한이 필요합니다.
 *     tags:
 *       - Customer
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: number
 *         description: 페이지 번호
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: number
 *         description: 페이지당 항목 수
 *     responses:
 *       200:
 *         description: 고객 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseCustomerListDTO'
 *       401:
 *         description: 인증 실패 또는 권한이 없는 사용자입니다.
 */
export const getCustomerList: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.EMPLOYEE && reqUser.role !== USER_ROLE.OWNER) {
    throw new UnauthError();
  }

  const page = create(req.query, PageParamsStruct);
  const result = await customerService.getCustomers(reqUser.companyId, page);
  res.send(new ResponseCustomerListDTO(page.page, page.pageSize, result));
};

/**
 * @openapi
 * /customers:
 *   post:
 *     summary: 고객 등록
 *     description: 새로운 고객을 등록합니다. 등록된 고객 정보는 반환됩니다. 직원 권한을 가진 사용자만 등록할 수 있습니다.
 *     tags:
 *       - Customer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: 등록할 고객의 정보를 포함합니다.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 고객 이름
 *               gender:
 *                 type: string
 *                 description: 고객 성별
 *               phoneNumber:
 *                 type: string
 *                 description: 고객 전화번호
 *               ageGroup:
 *                 type: string
 *                 enum: ['teen', 'twenties', 'thirties', 'forties', 'fifties', 'sixties', 'seventies', 'eightyPlus']
 *                 description: 고객 연령대
 *               region:
 *                 type: string
 *                 enum: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Ulsan', 'Gyeonggi']
 *                 description: 고객 거주 지역
 *               email:
 *                 type: string
 *                 description: 고객 이메일
 *               memo:
 *                 type: string
 *                 description: 고객에 대한 메모 (선택 사항)
 *     responses:
 *       201:
 *         description: 고객이 성공적으로 등록되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseCustomerDTO'
 *             example:
 *               id: 1
 *               name: "홍길동"
 *               gender: "남성"
 *               phoneNumber: "010-1234-5678"
 *               ageGroup: "30대"
 *               region: "서울"
 *               email: "hong@example.com"
 *               memo: "VIP 고객"
 *               contractCount: 0
 *       400:
 *         description: 잘못된 요청입니다. 필수 필드가 누락되었거나 잘못된 형식일 수 있습니다.
 *       401:
 *         description: 직원 권한이 없는 사용자입니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */

export const postCustomer: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.EMPLOYEE) {
    throw new UnauthError();
  }
  const rawData = create(req.body, CreateCustomerBodyStruct);
  const customer = await customerService.createCustomer(reqUser.companyId, rawData);
  const reverseTransformedData = new ResponseCustomerDTO(customer);
  res.status(201).send(reverseTransformedData);
};

/**
 * @openapi
 * /customers/{customerId}:
 *   patch:
 *     summary: 고객 정보 수정
 *     description: 고객의 정보를 수정합니다.
 *     tags:
 *       - Customer
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: number
 *         description: 수정할 고객의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 고객 이름
 *               gender:
 *                 type: string
 *                 description: 고객 성별
 *               phoneNumber:
 *                 type: string
 *                 description: 고객 전화번호 형식 010-1234-5678
 *               ageGroup:
 *                 type: string
 *                 enum: ['teen', 'twenties', 'thirties', 'forties', 'fifties', 'sixties', 'seventies', 'eightyPlus']
 *                 description: 고객 연령대
 *               region:
 *                 type: string
 *                 enum: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Ulsan', 'Gyeonggi']
 *                 description: 고객 거주 지역
 *               email:
 *                 type: string
 *                 description: 고객 이메일
 *               memo:
 *                 type: string
 *                 description: 고객 메모
 *     responses:
 *       200:
 *         description: 고객 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseCustomerDTO'
 *       401:
 *         description: 권한이 없거나 회사가 일치하지 않습니다.
 */
export const patchCustomer: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.EMPLOYEE) {
    throw new UnauthError();
  }
  const { customerId } = create(req.params, CustomerIdParamStruct);
  const customerCompanyId = await customerService.getCompanyIdById(customerId);
  if (reqUser.companyId !== customerCompanyId) {
    throw new UnauthError();
  }
  const rawData = create(req.body, PatchCustomerBodyStruct);
  const customer = await customerService.updateCustomer(customerId, rawData);
  const reverseTransformedData = new ResponseCustomerDTO(customer);
  res.send(reverseTransformedData);
};

/**
 * @openapi
 * /customers/{customerId}:
 *   delete:
 *     summary: 고객 삭제
 *     description: 특정 고객 정보를 삭제합니다.
 *     tags:
 *       - Customer
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: number
 *         description: 삭제할 고객의 ID
 *     responses:
 *       200:
 *         description: 고객 삭제 성공
 *       401:
 *         description: 권한이 없거나 회사가 일치하지 않습니다.
 */
export const deleteCustomer: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.EMPLOYEE) {
    throw new UnauthError();
  }
  const { customerId } = create(req.params, CustomerIdParamStruct);
  const customerCompanyId = await customerService.getCompanyIdById(customerId);
  if (reqUser.companyId !== customerCompanyId) {
    throw new UnauthError();
  }
  await customerService.deleteCustomer(customerId);
  res.status(200).send({ message: '고객 삭제 성공' });
};

/**
 * @openapi
 * /customers/upload:
 *   post:
 *     summary: 고객 일괄 등록
 *     description: CSV 파일을 통해 여러 고객을 일괄 등록합니다. 각 고객 정보는 CSV 형식으로 제공되며, 잘못된 형식의 데이터는 등록되지 않고, 오류 메시지가 반환됩니다.
 *     tags:
 *       - Customer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: 고객 정보를 포함한 CSV 파일을 업로드합니다.
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: 고객 일괄 등록 성공. 등록되지 않은 잘못된 데이터와 오류 메시지가 함께 반환됩니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "성공적으로 등록되었습니다."
 *                 invalidcustomerList:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       record:
 *                         type: object
 *                       errorMessage:
 *                         type: string
 *                       example:
 *                         record: { "name": "홍길동", "phoneNumber": "010-1234-5678" }
 *                         errorMessage: "잘못된 형식의 전화번호"
 */
export const postCustomers: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.EMPLOYEE) {
    throw new UnauthError();
  }
  if (!req.file) {
    throw new BadRequestError('잘못된 요청입니다.');
  }
  const customerList: any[] = [];
  const invalidcustomerList: {
    record: any;
    errorMessage: string;
  }[] = [];

  const records = parse(req.file.buffer, {
    columns: true,
    trim: true,
    bom: true,
  });
  for (const record of records) {
    try {
      const validated = CreateCustomerBodyStruct.create(record);
      customerList.push(new CreateCustomerDTO(validated));
    } catch (err) {
      if (err instanceof StructError) {
        invalidcustomerList.push({
          record,
          errorMessage: err.message,
        });
      } else {
        throw err;
      }
    }
  }
  if (customerList.length === 0) {
    throw new BadRequestError('잘못된 요청입니다.');
  }
  await customerService.createCustomers(reqUser.companyId, customerList);
  res.status(200).send({
    message: '성공적으로 등록되었습니다.',
    invalidcustomerList,
  });
};
