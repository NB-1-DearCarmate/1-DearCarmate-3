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
