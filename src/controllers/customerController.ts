import { USER_ROLE } from '@prisma/client';
import { OmittedUser } from '../../types/OmittedUser';
import { RequestHandler } from 'express';
import UnauthError from '../lib/errors/UnauthError';
import customerService from '../services/customerService';
import { CreateCustomerBodyStruct } from '../structs/customerStructs';
import { create } from 'superstruct';
import userService from '../services/userService';
import { PageParamsStruct } from '../structs/commonStructs';
import { RequestCustomerDTO, ResponseCustomerDTO } from '../lib/dtos/customerDTO';

export const getCustomer: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.EMPLOYEE) {
    throw new UnauthError();
  }
  const customerId = parseInt(req.params.customerId, 10);
  //const customer = await customerService.getCustomer(customerId);
  //res.status(200).send(customer);
};

export const getCustomerList: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.EMPLOYEE) {
    throw new UnauthError();
  }
  const page = create(req.query, PageParamsStruct);
  //const customers = await customerService.getCustomers(page);
  // res.status(200).send(customers);
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
 *       - accessToken: []
 *     requestBody:
 *       required: true
 *       description: 등록할 고객의 정보를 포함합니다.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCustomerBodyType'
 *           example:
 *             name: "홍길동"
 *             gender: "남성"
 *             phoneNumber: "010-1234-5678"
 *             ageGroup: "30대"
 *             region: "서울"
 *             email: "hong@example.com"
 *             memo: "VIP 고객"
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
  const userCompanyId = await userService.getCompanyIdById(reqUser.id);
  const transformedData = new RequestCustomerDTO(rawData);
  const customer = await customerService.createCustomer(userCompanyId, transformedData);
  const reverseTransformedData = new ResponseCustomerDTO(customer);
  res.status(201).send(reverseTransformedData);
};

export const patchCustomer: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.EMPLOYEE) {
    throw new UnauthError();
  }
  const customerId = parseInt(req.params.customerId, 10);
  //const data = create(req.body, PatchCustomerBodyStruct);
  //const customer = await customerService.patchCustomer(customerId, data);
  //res.status(200).send(customer);
};

export const deleteCustomer: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.EMPLOYEE) {
    throw new UnauthError();
  }
  const customerId = parseInt(req.params.customerId, 10);
  //await customerService.deleteCustomer(customerId);
  res.status(204).send();
};

export const postCustomers: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.EMPLOYEE) {
    throw new UnauthError();
  }
  // const data = create(req.body, CreateCustomerBodyStruct);
  // const customers = await customerService.createCustomers(data);
  // res.status(201).send(customers);
};
