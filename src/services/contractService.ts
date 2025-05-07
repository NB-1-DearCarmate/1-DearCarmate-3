import prisma from '../config/prismaClient';
import { assert } from 'superstruct';
import { ContractCreateStruct } from '../structs/contractStructs';
import { CONTRACT_STATUS, Prisma } from '@prisma/client';
import { PageParamsType } from '../structs/commonStructs';
import contractRepository from '../repositories/contractRepository';

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
  return contract;
};

const updateContractService = async (id: number, data: any) => {
  const { meetings, ...contractData } = data;
  const updatedContract = await contractRepository.update(id, contractData, meetings);
  return updatedContract;
};

const getAllContractsService = async () => {
  const contracts = await contractRepository.findAll();
  return contracts;
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

// develop 계약 문서 포함 리스트 조회
const getContractListWithDcmt = async (companyId: number, params: PageParamsType) => {
  const contracts = await contractRepository.findManyWithDcmt(companyId, params);
  return {
    contracts,
    page: params.page,
    pageSize: params.pageSize,
    totalItemCount: contracts.length,
  };
};

// develop 계약서 드래프트용 조회
const getContractDraft = async (companyId: number) => {
  return await contractRepository.findManyDraft(companyId);
};

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
  getContractListWithDcmt,
  getContractDraft,
};
