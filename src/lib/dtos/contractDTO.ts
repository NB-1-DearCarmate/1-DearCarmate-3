import { CONTRACT_STATUS } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export type ContractForResponse = {
  id: number;
  contractPrice: Decimal;
  status: CONTRACT_STATUS;
  resolutionDate: Date | null;

  user: { id: number; name: string };
  customer: { id: number; name: string };
  car: {
    id: number;
    carModel: {
      model: string;
    };
  };
  meetings: { time: Date }[];
  contractDocuments?: {
    id: number;
    fileName: string;
    filePath: string;
    fileSize: number | null;
    contractId: number | null;
  }[];
};

export class ResponseContractDTO {
  id: number;
  contractPrice: number;
  status: string;
  resolutionDate: Date | null;

  user: { id: number; name: string };
  customer: { id: number; name: string };
  car: { id: number; model: string };
  meetings: { date: string }[];

  constructor(contract: ContractForResponse) {
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

class ContractListItemDTO {
  id: number;
  car: { id: number; model: string };
  customer: { id: number; name: string };
  user: { id: number; name: string };
  meetings: { date: string }[];
  contractPrice: number;
  resolutionDate: Date | null;
  status: string;
  constructor(contract: ContractForResponse) {
    this.id = contract.id;
    this.car = { id: contract.car.id, model: contract.car.carModel.model };
    this.customer = { id: contract.customer.id, name: contract.customer.name };
    this.user = { id: contract.user.id, name: contract.user.name };
    this.meetings = contract.meetings.map((m) => ({ date: m.time.toISOString() }));
    this.contractPrice = contract.contractPrice.toNumber();
    this.resolutionDate = contract.resolutionDate;
    this.status = contract.status;
  }
}

export class ResponseContractListDTO {
  carInspection = { totalItemCount: 0, data: [] as ContractListItemDTO[] };
  priceNegotiation = { totalItemCount: 0, data: [] as ContractListItemDTO[] };
  contractDraft = { totalItemCount: 0, data: [] as ContractListItemDTO[] };
  contractSuccessful = { totalItemCount: 0, data: [] as ContractListItemDTO[] };
  contractFailed = { totalItemCount: 0, data: [] as ContractListItemDTO[] };

  private statusMap = {
    [CONTRACT_STATUS.VEHICLE_CHECKING]: 'carInspection',
    [CONTRACT_STATUS.PRICE_CHECKING]: 'priceNegotiation',
    [CONTRACT_STATUS.CONTRACT_PREPARING]: 'contractDraft',
    [CONTRACT_STATUS.CONTRACT_SUCCESS]: 'contractSuccessful',
    [CONTRACT_STATUS.CONTRACT_FAILED]: 'contractFailed',
  } as const;

  constructor(contracts: ContractForResponse[]) {
    contracts.forEach((contract) => {
      const key = this.statusMap[contract.status];
      if (key) {
        this[key].data.push(new ContractListItemDTO(contract));
        this[key].totalItemCount++;
      }
    });
  }
}

export class ResponseCustomerDropdownDTO {
  constructor(customers: { id: number; name: string; email: string }[]) {
    return customers.map(({ id, name, email }) => ({
      id,
      data: `${name}(${email})`,
    }));
  }
}

export class ResponseUserDropdownDTO {
  constructor(users: { id: number; name: string; email: string }[]) {
    return users.map(({ id, name, email }) => ({
      id,
      data: `${name}(${email})`,
    }));
  }
}

export class ResponseCarDropdownDTO {
  constructor(cars: { id: number; carModel: { model: string }; carNumber: string }[]) {
    return cars.map((car) => ({
      id: car.id,
      data: `${car.carModel.model}(${car.carNumber})`,
    }));
  }
}
