import { Customer } from '@prisma/client';

export class ResponseCustomerDTO {
  id: number;
  name: string;
  gender: string;
  phoneNumber: string;
  ageGroup: string;
  region: string;
  email: string;
  memo: string;
  contractCount: number;

  constructor(customer: Customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.gender = customer.gender;
    this.phoneNumber = customer.phoneNumber;
    this.ageGroup = customer.ageGroup;
    this.region = customer.region;
    this.email = customer.email;
    this.memo = customer.memo ?? '';
    this.contractCount = customer.contractCount ?? 0;
  }
}
