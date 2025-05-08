import { Contract, Customer, Car, CarModel, User, Meeting, ContractDocument } from '@prisma/client';
import prisma from '../../config/prismaClient';

export type FullContract = Contract & {
  customer: Customer;
  car: Car & { carModel: { model: string } };
  user: User;
  meetings: Meeting[];
  contractDocuments: ContractDocument[];
};

async function findById(id: number): Promise<FullContract | null> {
  return await prisma.contract.findUnique({
    where: { id },
    include: {
      customer: true,
      car: { include: { carModel: true } },
      user: true,
      meetings: true,
      contractDocuments: true,
    },
  });
}

export class ResponseContractDTO {
  id: number;
  contractPrice: number;
  status: string;
  resolutionDate: Date | null;

  user: { id: number; name: string };
  customer: { id: number; name: string };
  car: { id: number; model: string };
  meetings: { date: string }[];

  constructor(contract: FullContract) {
    this.id = contract.id;
    this.contractPrice = contract.contractPrice.toNumber();
    this.status = contract.status;
    this.resolutionDate = contract.resolutionDate;

    this.user = { id: contract.user.id, name: contract.user.name };
    this.customer = { id: contract.customer.id, name: contract.customer.name };
    this.car = { id: contract.car.id, model: contract.car.carModel.model };
    this.meetings = contract.meetings.map((m) => ({ date: m.time.toISOString() }));
  }
}
