import { USER_ROLE } from '@prisma/client';
import { OmittedUser } from '../../types/OmittedUser';
import { RequestHandler } from 'express';
import UnauthError from '../lib/errors/UnauthError';
import customerService from '../services/customerService';
import { CreateCustomerBodyStruct } from '../structs/customerStructs';
import { create } from 'superstruct';
import { AGE_GROUP, REGION } from '@prisma/client';
import userService from '../services/userService';

const ageGroupMap: Record<string, AGE_GROUP> = {
  '10대': AGE_GROUP.AGE_10,
  '20대': AGE_GROUP.AGE_20,
  '30대': AGE_GROUP.AGE_30,
  '40대': AGE_GROUP.AGE_40,
  '50대': AGE_GROUP.AGE_50,
  '60대': AGE_GROUP.AGE_60,
  '70대': AGE_GROUP.AGE_70,
  '80대': AGE_GROUP.AGE_80,
};

const regionMap: Record<string, REGION> = {
  서울: REGION.SEOUL,
  경기: REGION.GYEONGGI,
  인천: REGION.INCHEON,
  강원: REGION.GANGWON,
  충북: REGION.CHOUNGBUK,
  충남: REGION.CHOUNGNAM,
  세종: REGION.SEJONG,
  대전: REGION.DAJEON,
  경북: REGION.GYEONGBUK,
  경남: REGION.GYEONGNAM,
  광주: REGION.GWANGJU,
  전북: REGION.JEONBUK,
  전남: REGION.JEONNAM,
  대구: REGION.DAEGU,
  울산: REGION.ULSAN,
  부산: REGION.BUSAN,
  제주: REGION.JEJU,
};

const reverseAgeGroupMap: Record<AGE_GROUP, string> = Object.fromEntries(
  Object.entries(ageGroupMap).map(([key, value]) => [value, key]),
) as Record<AGE_GROUP, string>;

const reverseRegionMap: Record<REGION, string> = Object.fromEntries(
  Object.entries(regionMap).map(([key, value]) => [value, key]),
) as Record<REGION, string>;

export const getCustomer: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.EMPLOYEE) {
    throw new UnauthError();
  }
  const customerId = parseInt(req.params.customerId, 10);
  //const customer = await customerService.getCustomer(customerId);
  //res.status(200).send(customer);
};

export const getCustomers: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.EMPLOYEE) {
    throw new UnauthError();
  }
  //const page = create(req.query, PageParamsStruct);
  //const customers = await customerService.getCustomers(page);
  // res.status(200).send(customers);
};

export const postCustomer: RequestHandler = async (req, res) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.EMPLOYEE) {
    throw new UnauthError();
  }
  const rawData = create(req.body, CreateCustomerBodyStruct);
  const userCompanyId = await userService.getCompanyIdById(reqUser.id);
  const transformedData = {
    ...rawData,
    ageGroup: ageGroupMap[rawData.ageGroup],
    region: regionMap[rawData.region],
  };
  const customer = await customerService.createCustomer(userCompanyId, transformedData);
  const reverseTransformedData = {
    ...customer,
    ageGroup: reverseAgeGroupMap[customer.ageGroup as AGE_GROUP],
    region: reverseRegionMap[customer.region as REGION],
  };
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
