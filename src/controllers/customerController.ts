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
  const userCompanyId = await userService.getCompanyIdById(reqUser.id);
  const customers = await customerService.getCustomers(userCompanyId, page);
  res.status(200).send(customers);
};

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
