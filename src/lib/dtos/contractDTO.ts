import { Contract, Customer, Car, User, Meeting, ContractDocument } from '@prisma/client';

type FullContract = Contract & {
  customer: Customer;
  car: Car;
  user: User;
  meetings: Meeting[];
  contractDocuments: ContractDocument[];
  updatedAt: Date;
};

export class ResponseContractDTO {
  id: number;
  contractPrice: number;
  status: string;
  resolutionDate: Date | null;
  createdAt: Date;
  updatedAt: Date;

  // 관계 DTO
  customer: Customer;
  car: Car;
  user: User;
  meetings: Meeting[];
  contractDocuments: ContractDocument[];

  constructor(contract: FullContract) {
    this.id = contract.id;
    this.contractPrice = contract.contractPrice.toNumber();
    this.status = contract.status;
    this.resolutionDate = contract.resolutionDate;
    this.createdAt = contract.createdAt;
    this.updatedAt = contract.updatedAt;

    this.customer = contract.customer;
    this.car = contract.car;
    this.user = contract.user;
    this.meetings = contract.meetings;
    this.contractDocuments = contract.contractDocuments;
  }
}
