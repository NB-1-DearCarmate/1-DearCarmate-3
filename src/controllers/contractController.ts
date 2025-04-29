import { Request, Response } from 'express';
import contractService from '../services/contractService';
import { RequestHandler } from 'express';

const createContract = async (req: Request, res: Response) => {
  try {
    const contract = await contractService.createContractService(req.body);
    res.status(201).json(contract);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '계약 생성 실패' });
  }
};

const updateContract = async (req: Request, res: Response) => {
  try {
    const contractId = parseInt(req.params.id);
    const updated = await contractService.updateContractService(contractId, req.body);
    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '계약 수정 실패' });
  }
};

const getAllContracts = async (req: Request, res: Response) => {
  try {
    const contracts = await contractService.getAllContractsService();
    res.status(200).json(contracts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '계약 목록 조회 실패' });
  }
};

const getContractById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const contract = await contractService.getContractByIdService(id);
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

const deleteContract = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await contractService.deleteContractService(id);
    res.status(200).json({ message: '계약이 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '계약 삭제 실패' });
  }
};

const updateContractStatus = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { status, resolutionDate } = req.body;
    const updated = await contractService.updateContractStatusService(id, status, resolutionDate);
    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '계약 상태 변경 실패' });
  }
};

const getCustomerDropdown: RequestHandler = async (req: Request, res: Response) => {
  const companyId = (req.user as { companyId: number }).companyId;

  if (!companyId) {
    res.status(400).json({ message: '회사 정보가 없습니다.' });
  }

  const customers = await contractService.getCustomerDropdownService(companyId);
  res.status(200).json(customers);
};

export default {
  createContract,
  updateContract,
  getAllContracts,
  getContractById,
  deleteContract,
  updateContractStatus,
  getCustomerDropdown,
};
