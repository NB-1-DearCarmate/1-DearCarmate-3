import { USER_ROLE } from '@prisma/client';
import { OmittedUser } from '../../types/OmittedUser';
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
  RequestCustomerDTO,
  RequestUpdateCustomerDTO,
  ResponseCustomerDTO,
} from '../lib/dtos/customerDTO';
import { parse } from 'csv-parse/sync';
import { StructError } from 'superstruct';

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
  res.status(200).send(new ResponseCustomerDTO(customer));
};

export const getCustomerList: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.EMPLOYEE) {
    throw new UnauthError();
  }
  const page = create(req.query, PageParamsStruct);
  const customers = await customerService.getCustomers(reqUser.companyId, page);
  res.status(200).send(customers);
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
  const transformedData = new RequestCustomerDTO(rawData);
  const customer = await customerService.createCustomer(reqUser.companyId, transformedData);
  const reverseTransformedData = new ResponseCustomerDTO(customer);
  res.status(201).send(reverseTransformedData);
};

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
  const transformedData = new RequestUpdateCustomerDTO(rawData);
  const customer = await customerService.updateCustomer(customerId, transformedData);
  const reverseTransformedData = new ResponseCustomerDTO(customer);
  res.status(200).send(reverseTransformedData);
};

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

export const postCustomers: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.EMPLOYEE) {
    throw new UnauthError();
  }
  if (!req.file) {
    res.status(400).json({ message: '잘못된 요청입니다' });
    return;
  }
  const customerList: any[] = [];
  const invalidcustomerList: { record: any; error: StructError }[] = [];

  console.log('req.file', req.file);
  try {
    const records = parse(req.file.buffer, {
      columns: true,
      trim: true,
      bom: true,
    });
    console.log(records);
    for (const record of records) {
      try {
        const validated = CreateCustomerBodyStruct.create(record);
        customerList.push(new RequestCustomerDTO(validated));
      } catch (err) {
        if (err instanceof StructError) {
          invalidcustomerList.push({ record, error: err });
        } else {
          throw err;
        }
      }
    }
    await customerService.createCustomers(reqUser.companyId, customerList);
    res.status(200).send({
      message: '성공적으로 등록되었습니다.',
    });
  } catch (err) {
    res.status(500).json({ message: '파일 처리 중 에러 발생', error: err });
  }
};
