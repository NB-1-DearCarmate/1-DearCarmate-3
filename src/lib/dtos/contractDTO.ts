import { Contract, ContractDocument } from '@prisma/client';

export class ResponseContractDcmtDTO {
  currentPage: number;
  totalPages: number;
  totalItemCount: number;
  data: {
    id: number;
    contractName: string;
    resolutionDate: string | null;
    documentsCount: number;
    manager: string;
    carNumber: string;
    documents: { id: number; fileName: string }[];
  }[];

  constructor(
    contracts: ContractWithRelations[],
    currentPage: number,
    pageSize: number,
    totalItemCount: number,
  ) {
    this.currentPage = currentPage;
    this.totalItemCount = totalItemCount;
    this.totalPages = Math.ceil(totalItemCount / pageSize);
    this.data = contracts.map((contract) => this.transformContractData(contract));
  }

  private transformContractData(contract: ContractWithRelations) {
    const contractName = `${contract.car.carModel.model} - ${contract.customer.name} 고객님`;

    return {
      id: contract.id,
      contractName,
      resolutionDate: contract.resolutionDate ? contract.resolutionDate.toISOString() : null,
      documentsCount: contract.contractDocuments.length,
      manager: contract.user.name,
      carNumber: contract.car.carNumber,
      documents: contract.contractDocuments.map((doc: ContractDocument) => ({
        id: doc.id,
        fileName: doc.fileName,
      })),
    };
  }
}

export type ContractWithRelations = Contract & {
  contractDocuments: ContractDocument[];
  user: { id: number; name: string };
  car: {
    id: number;
    carNumber: string;
    carModel: { id: number; model: string };
  };
  customer: { id: number; name: string };
};
