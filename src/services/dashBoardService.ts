import { Prisma } from '@prisma/client';
import {
  RequestCustomerDTO,
  RequestUpdateCustomerDTO,
  ResponseCustomerDTO,
} from '../lib/dtos/customerDTO';
import customerRepository from '../repositories/customerRepositry';
import { PageParamsType } from '../structs/commonStructs';

async function getDashBoardData(customerId: number) {
  return await customerRepository.getById(customerId);
}

export default {
  getDashBoardData,
};
