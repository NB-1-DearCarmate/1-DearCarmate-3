import { ContractCreateType, ContractUpdateType } from '../structs/contractStructs';
import { CONTRACT_STATUS } from '@prisma/client';
import { PageParamsType, SearchParamsType } from '../structs/commonStructs';
import { ContractForResponse } from '../lib/dtos/contractDTO';
import contractRepository from '../repositories/contractRepository';

const createContractService = async (
  data: ContractCreateType,
  userId: number,
  companyId: number,
) => {
  const contract = await contractRepository.create(data, userId, companyId);
  return contract as ContractForResponse;
};

const updateContractService = async (id: number, data: ContractUpdateType) => {
  const updatedContract = await contractRepository.update(id, data);
  return updatedContract;
};

const getAllContractsService = async (params: SearchParamsType, companyId: number) => {
  return await contractRepository.findMany(params, companyId);
};

const getContractByIdService = async (id: number) => {
  const contract = await contractRepository.findById(id);
  return contract;
};

const deleteContractService = async (id: number) => {
  return await contractRepository.deleteById(id);
};

const updateContractStatusService = async (
  id: number,
  status: CONTRACT_STATUS,
  resolutionDate?: Date | null,
) => {
  const updatedContract = await contractRepository.updateStatus(id, status, resolutionDate);
  return updatedContract;
};

const getCustomerDropdownService = async (companyId: number) => {
  return await contractRepository.findCustomerDropdown(companyId);
};

const getUserDropdownService = async (companyId: number) => {
  return await contractRepository.findUserDropdown(companyId);
};

const getCarDropdownService = async (companyId: number) => {
  return await contractRepository.findCarDropdown(companyId);
};

// develop 계약서 드래프트용 조회
const getContractDraft = async (companyId: number) => {
  return await contractRepository.findManyDraft(companyId);
};

export async function getContractListWithDoc(companyId: number, params: PageParamsType) {
  return await contractRepository.findManyWithDoc(companyId, params);
}

export default {
  createContractService,
  updateContractService,
  getAllContractsService,
  getContractByIdService,
  deleteContractService,
  updateContractStatusService,
  getCustomerDropdownService,
  getUserDropdownService,
  getCarDropdownService,
  getContractListWithDoc,
  getContractDraft,
};
