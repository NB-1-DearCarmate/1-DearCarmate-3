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

export class ResponseContractListDTO {
  carInspection: { totalItemCount: number; data: ContractForResponse[] };
  priceNegotiation: { totalItemCount: number; data: ContractForResponse[] };
  contractDraft: { totalItemCount: number; data: ContractForResponse[] };
  contractSuccessful: { totalItemCount: number; data: ContractForResponse[] };
  contractFailed: { totalItemCount: number; data: ContractForResponse[] };

  constructor(contracts: ContractForResponse[]) {
    this.carInspection = {
      totalItemCount: 0,
      data: [],
    };
    this.priceNegotiation = {
      totalItemCount: 0,
      data: [],
    };
    this.contractDraft = {
      totalItemCount: 0,
      data: [],
    };
    this.contractSuccessful = {
      totalItemCount: 0,
      data: [],
    };
    this.contractFailed = {
      totalItemCount: 0,
      data: [],
    };

    contracts.forEach((contract) => {
      switch (contract.status) {
        case CONTRACT_STATUS.VEHICLE_CHECKING:
          this.carInspection.data.push(contract);
          this.carInspection.totalItemCount++;
          break;
        case CONTRACT_STATUS.PRICE_CHECKING:
          this.priceNegotiation.data.push(contract);
          this.priceNegotiation.totalItemCount++;
          break;
        case CONTRACT_STATUS.CONTRACT_PREPARING:
          this.contractDraft.data.push(contract);
          this.contractDraft.totalItemCount++;
          break;
        case CONTRACT_STATUS.CONTRACT_SUCCESS:
          this.contractSuccessful.data.push(contract);
          this.contractSuccessful.totalItemCount++;
          break;
        case CONTRACT_STATUS.CONTRACT_FAILED:
          this.contractFailed.data.push(contract);
          this.contractFailed.totalItemCount++;
          break;
      }
    });
  }
}

export class ResponseCustomerDropdownDTO {
  constructor(customers: { id: number; name: string }[]) {
    return customers.map(({ id, name }) => ({
      id,
      data: name,
    }));
  }
}

export class ResponseUserDropdownDTO {
  constructor(users: { id: number; name: string }[]) {
    return users.map(({ id, name }) => ({
      id,
      data: name,
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
