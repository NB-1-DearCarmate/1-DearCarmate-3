import { Prisma } from '@prisma/client';
import {
  RequestCustomerDTO,
  RequestUpdateCustomerDTO,
  ResponseCustomerDTO,
} from '../lib/dtos/customerDTO';
import customerRepository from '../repositories/customerRepositry';
import { PageParamsType } from '../structs/commonStructs';

async function createCustomer(companyId: number, customer: RequestCustomerDTO) {
  const data = {
    ...customer,
    company: {
      connect: {
        id: companyId,
      },
    },
  };
  return await customerRepository.create(data);
}

async function getCustomer(customerId: number) {
  return await customerRepository.getById(customerId);
}

async function getCustomers(
  companyId: number,
  { page, pageSize, searchBy, keyword }: PageParamsType,
) {
  let prismaParams: {
    skip: number;
    take: number;
    where?: Prisma.CustomerWhereInput;
  } = {
    skip: (page - 1) * pageSize,
    take: pageSize,
  };
  let prismaWhereCondition: Prisma.CustomerWhereInput = { companyId: companyId };
  if (searchBy && keyword) {
    switch (searchBy) {
      case 'name':
        prismaWhereCondition = {
          ...prismaWhereCondition,
          name: {
            contains: keyword,
          },
        };
        break;
      case 'email':
        prismaWhereCondition = {
          ...prismaWhereCondition,
          email: {
            contains: keyword,
          },
        };
    }
  }
  prismaParams = {
    ...prismaParams,
    where: prismaWhereCondition,
  };

  const customers = await customerRepository.getList(prismaParams);
  const totalItemCount = await customerRepository.getCount({
    where: prismaWhereCondition,
  });
  return {
    currentPage: page,
    totalPages: Math.ceil(totalItemCount / pageSize),
    totalItemCount,
    data: customers.map((customer) => new ResponseCustomerDTO(customer)),
  };
}

async function updateCustomer(customerId: number, customer: RequestUpdateCustomerDTO) {
  return await customerRepository.update(customerId, customer);
}

async function getCompanyIdById(customerId: number) {
  const customer = await customerRepository.getById(customerId);
  if (!customer) {
    throw new Error('Customer not found');
  }
  return customer.companyId;
}

export default {
  createCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
  getCompanyIdById,
};
