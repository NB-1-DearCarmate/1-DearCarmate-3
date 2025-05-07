<<<<<<< HEAD
import { Request, Response } from "express";
import contractService from "../services/contractService";
import { validate } from "superstruct";
import { ContractCreateStruct } from "../structs/contractStructs";
import CommonError from "../lib/errors/CommonError";
import { CONTRACT_STATUS } from "@prisma/client";

const createContract = async (req: Request, res: Response) => {
  const [error] = validate(req.body, ContractCreateStruct);
  if (error) {
    throw new CommonError("계약 생성 요청 형식이 올바르지 않습니다.", 400);
  }

  const contract = await contractService.createContractService(req.body);
  res.status(201).json(contract);
};

const updateContract = async (req: Request, res: Response) => {
  const contractId = parseInt(req.params.id);
  const updated = await contractService.updateContractService(contractId, req.body);
  res.status(200).json(updated);
};

const getAllContracts = async (req: Request, res: Response) => {
  const contracts = await contractService.getAllContractsService();
  res.status(200).json(contracts);
};

const getContractById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const contract = await contractService.getContractByIdService(id);
  if (!contract) {
    throw new CommonError("계약을 찾을 수 없습니다.", 404);
  }
  res.status(200).json(contract);
};

const deleteContract = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await contractService.deleteContractService(id);
  res.status(200).json({ message: "계약이 삭제되었습니다." });
};

const updateContractStatus = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { status, resolutionDate } = req.body;

  if (!Object.values(CONTRACT_STATUS).includes(status)) {
    throw new CommonError("유효하지 않은 계약 상태입니다.", 400);
  }

  const updated = await contractService.updateContractStatusService(id, status, resolutionDate);
  res.status(200).json(updated);
};

const getCustomerDropdown = async (req: Request, res: Response) => {
  const companyId = (req.user as { companyId: number })?.companyId;
  if (!companyId) {
    throw new CommonError("회사 정보가 없습니다.", 400);
  }

  const customers = await contractService.getCustomerDropdownService(companyId);
  res.status(200).json(customers);
};

const getUserDropdown = async (req: Request, res: Response) => {
  const companyId = (req.user as { companyId: number })?.companyId;
  if (!companyId) {
    throw new CommonError("회사 정보가 없습니다.", 400);
  }

  const users = await contractService.getUserDropdownService(companyId);
  res.status(200).json(users);
};

const getCarDropdown = async (req: Request, res: Response) => {
  const companyId = (req.user as { companyId: number })?.companyId;
  if (!companyId) {
    throw new CommonError("회사 정보가 없습니다.", 400);
  }

  const cars = await contractService.getCarDropdownService(companyId);
  res.status(200).json(cars);
};

export default {
  createContract,
  updateContract,
  getAllContracts,
  getContractById,
  deleteContract,
  updateContractStatus,
  getCustomerDropdown,
  getUserDropdown,
  getCarDropdown,
};
=======
import { Request, Response } from 'express';
import {
  createContractService,
  updateContractService,
  getAllContractsService,
  getContractByIdService,
  deleteContractService,
  updateContractStatusService,
  getCustomerDropdownService,
} from '../services/contractService';
import { RequestHandler } from 'express';
import { sendEmail } from '../lib/emailHandler';

export const createContract = async (req: Request, res: Response) => {
  try {
    const contract = await createContractService(req.body);
    res.status(201).json(contract);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '계약 생성 실패' });
  }
};

export const updateContract = async (req: Request, res: Response) => {
  try {
    const contractId = parseInt(req.params.id);
    const existingContract = await getContractByIdService(contractId);
    const existingDcmtId = new Set(existingContract?.contractDocuments.map((dcmt) => dcmt.id));

    const updated = await updateContractService(contractId, req.body);

    const { contractDocuments, customer, ...tempResponse } = updated;
    if (contractDocuments.some((dcmt) => !existingDcmtId.has(dcmt.id))) {
      sendEmail(customer.email);
    }
    res.status(200).json(tempResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '계약 수정 실패' });
  }
};

export const getAllContracts = async (req: Request, res: Response) => {
  try {
    const contracts = await getAllContractsService();
    res.status(200).json(contracts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '계약 목록 조회 실패' });
  }
};

export const getContractById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const contract = await getContractByIdService(id);
    if (!contract) {
      res.status(404).json({ message: '계약을 찾을 수 없습니다.' });
      return;
    }
    res.status(200).json(contract);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '계약 조회 실패' });
  }
};

export const deleteContract = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await deleteContractService(id);
    res.status(200).json({ message: '계약이 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '계약 삭제 실패' });
  }
};

export const updateContractStatus = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { status, resolutionDate } = req.body;
    const updated = await updateContractStatusService(id, status, resolutionDate);
    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '계약 상태 변경 실패' });
  }
};

export const getCustomerDropdown: RequestHandler = async (req: Request, res: Response) => {
  const companyId = (req.user as { companyId: number }).companyId;

  if (!companyId) {
    res.status(400).json({ message: '회사 정보가 없습니다.' });
  }

  const customers = await getCustomerDropdownService(companyId);
  res.status(200).json(customers);
};
>>>>>>> 2fa121fcff2e3fcf0797515a04fc0134b3ed447a
