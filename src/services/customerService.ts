import { Prisma } from '@prisma/client';
import { CreateCustomerDTO, UpdateCustomerDTO, ResponseCustomerDTO } from '../lib/dtos/customerDTO';
import customerRepository from '../repositories/customerRepositry';
import { PageParamsType } from '../structs/commonStructs';
import NotFoundError from '../lib/errors/NotFoundError';
import { buildSearchCondition } from '../lib/searchCondition';

async function createCustomer(companyId: number, customer: CreateCustomerDTO) {
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

async function createCustomers(companyId: number, customers: CreateCustomerDTO[]) {
  const data = customers.map((customer) => {
    return {
      ...customer,
      companyId: companyId,
    };
  });
  return await customerRepository.createMany(data);
}

async function getCustomer(customerId: number) {
  return await customerRepository.getById(customerId);
}

async function getCustomers(companyId: number, params: PageParamsType) {
  const searchCondition = buildSearchCondition(params, ['name', 'email']);
  const where = {
    ...searchCondition.whereCondition,
    companyId: companyId,
  };
  const prismaParams = {
    ...searchCondition.pageCondition,
    where,
  };

  const customers = await customerRepository.getList(prismaParams);
  const totalItemCount = await customerRepository.getCount({
    where,
  });
  return {
    currentPage: params.page,
    totalPages: Math.ceil(totalItemCount / params.pageSize),
    totalItemCount,
    data: customers.map((customer) => new ResponseCustomerDTO(customer)),
  };
}

async function updateCustomer(customerId: number, customer: UpdateCustomerDTO) {
  return await customerRepository.update(customerId, customer);
}

async function getCompanyIdById(customerId: number) {
  const customer = await customerRepository.getById(customerId);
  if (!customer) {
    throw new NotFoundError('Customer', customerId);
  }
  return customer.companyId;
}

async function deleteCustomer(customerId: number) {
  return await customerRepository.deleteById(customerId);
}

export default {
  createCustomer,
  createCustomers,
  getCustomer,
  getCustomers,
  updateCustomer,
  getCompanyIdById,
  deleteCustomer,
};
