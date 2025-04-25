import { Prisma } from '@prisma/client';
import { ResponseCustomerDTO } from '../lib/dtos/customerDTO';
import customerRepository from '../repositories/customerRepositry';

async function createCustomer(companyId: number, customer: Prisma.CustomerCreateInput) {
  const data = {
    ...customer,
    company: {
      connect: {
        id: companyId,
      },
    },
  };
  const createdCustomer = await customerRepository.create(data);
  return new ResponseCustomerDTO(createdCustomer);
}

export default {
  createCustomer,
};
