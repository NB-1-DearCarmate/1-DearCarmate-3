import { assert } from 'superstruct';
import { ContractCreateStruct } from '../structs/contractStructs';
import { CONTRACT_STATUS, Prisma } from '@prisma/client';
import { PageParamsType, SearchParamsType } from '../structs/commonStructs';
import { ContractForResponse } from '../lib/dtos/contractDTO';
import contractRepository from '../repositories/contractRepository';
import { buildSearchCondition } from '../lib/searchCondition';

type CreateContractData = {
  customerId: number;
  carId: number;
  userId: number;
  companyId: number;
  contractPrice: number;
  meetings: { time: string }[];
};

const createContractService = async (data: CreateContractData) => {
  assert(data, ContractCreateStruct);
  const contract = await contractRepository.create(data);
  return contract as ContractForResponse;
};

const updateContractService = async (id: number, data: any) => {
  const { meetings, ...contractData } = data;
  const updatedContract = await contractRepository.update(id, contractData, meetings);
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
