import { RequestCustomerDTO, ResponseCustomerDTO } from '../lib/dtos/customerDTO';
import customerRepository from '../repositories/customerRepositry';

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

export default {
  createCustomer,
};
