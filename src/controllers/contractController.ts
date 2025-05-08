import { Request, Response } from 'express';
import contractService from '../services/contractService';
import {
  ContractForResponse,
  ResponseCarDropdownDTO,
  ResponseContractDTO,
  ResponseContractListDTO,
  ResponseCustomerDropdownDTO,
  ResponseUserDropdownDTO,
} from '../lib/dtos/contractDTO';
import { create, validate } from 'superstruct';
import { ContractCreateStruct } from '../structs/contractStructs';
import CommonError from '../lib/errors/CommonError';
import { sendEmail } from '../lib/emailHandler';
import { OmittedUser } from '../types/OmittedUser';
import { USER_ROLE } from '@prisma/client';
import UnauthError from '../lib/errors/UnauthError';
import { SearchParamsStruct } from '../structs/commonStructs';

const createContract = async (req: Request, res: Response) => {
  const [error] = validate(req.body, ContractCreateStruct);
  if (error) {
    throw new CommonError('계약 생성 요청 형식이 올바르지 않습니다.', 400);
  }

  const contract = await contractService.createContractService(req.body);
  res.status(201).send(new ResponseContractDTO(contract));
};

const updateContract = async (req: Request, res: Response) => {
  const contractId = parseInt(req.params.contractId);

  const existingContract = await contractService.getContractByIdService(contractId);
  const existingDcmtId = new Set(existingContract?.contractDocuments.map((dcmt) => dcmt.id));

  const updated = await contractService.updateContractService(contractId, req.body);

  const { customer, createdAt, companyId, id, ...tempResponse } = updated;
  const isNewDocumentAdded = updated.contractDocuments.some(
    (dcmt: { id: number }) => !existingDcmtId.has(dcmt.id),
  );

  if (isNewDocumentAdded) {
    sendEmail(customer.email);
  }

  res.send(tempResponse);
};

const getAllContracts = async (req: Request, res: Response) => {
  const reqUser = req.user as OmittedUser;
  if (reqUser.role !== USER_ROLE.EMPLOYEE && reqUser.role !== USER_ROLE.OWNER) {
    throw new UnauthError();
  }
  const params = create(req.query, SearchParamsStruct);
  const contracts = await contractService.getAllContractsService(params, reqUser.companyId);
  res.send(new ResponseContractListDTO(contracts));
};

const deleteContract = async (req: Request, res: Response) => {
  const reqUser = req.user as OmittedUser;
  const id = parseInt(req.params.contractId);
  const existingContract = await contractService.getContractByIdService(id);
  if (reqUser.companyId !== existingContract?.companyId) {
    throw new CommonError('담당자만 삭제가 가능합니다.', 403);
  }
  await contractService.deleteContractService(id);
  res.send({ message: '계약이 삭제되었습니다.' });
};

const getCustomerDropdown = async (req: Request, res: Response) => {
  const reqUser = req.user as OmittedUser;
  const customers = await contractService.getCustomerDropdownService(reqUser.companyId);
  res.send(new ResponseCustomerDropdownDTO(customers));
};

const getUserDropdown = async (req: Request, res: Response) => {
  const reqUser = req.user as OmittedUser;
  const users = await contractService.getUserDropdownService(reqUser.companyId);
  res.send(new ResponseUserDropdownDTO(users));
};

const getCarDropdown = async (req: Request, res: Response) => {
  const reqUser = req.user as OmittedUser;
  const cars = await contractService.getCarDropdownService(reqUser.companyId);
  res.send(new ResponseCarDropdownDTO(cars));
};

export default {
  createContract,
  updateContract,
  getAllContracts,
  deleteContract,
  getCustomerDropdown,
  getUserDropdown,
  getCarDropdown,
};
