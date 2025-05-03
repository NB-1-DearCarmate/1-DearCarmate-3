import { Contract, ContractDocument } from '@prisma/client';

export class CreateDocumentDTO {
  fileName: string;
  filePath: string;
  fileSize: number;
  constructor(fileName: string, filePath: string, fileSize: number) {
    this.fileName = fileName;
    this.filePath = filePath;
    this.fileSize = fileSize;
  }
}

export class ResponseDocumentIdDTO {
  contractDocumentId: number;
  constructor(contractDocumentId: number) {
    this.contractDocumentId = contractDocumentId;
  }
}

export class ResponseContractDocsDTO {
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
    this.data = contracts.map((contract) => new ResponseContractDocDTO(contract));
  }
}

export class ResponseContractDocDTO {
  id: number;
  contractName: string;
  resolutionDate: string | null;
  documentsCount: number;
  manager: string;
  carNumber: string;
  documents: { id: number; fileName: string }[];
  constructor(contract: ContractWithRelations) {
    this.id = contract.id;
    this.contractName = `${contract.car.carModel.model} - ${contract.customer.name} 고객님`;
    this.resolutionDate = contract.resolutionDate ? contract.resolutionDate.toISOString() : null;
    this.documentsCount = contract.contractDocuments.length;
    this.manager = contract.user.name;
    this.carNumber = contract.car.carNumber;
    this.documents = contract.contractDocuments.map((doc: ContractDocument) => ({
      id: doc.id,
      fileName: doc.fileName,
    }));
  }
}

type ContractWithRelations = Contract & {
  contractDocuments: ContractDocument[];
  user: { id: number; name: string };
  car: {
    id: number;
    carNumber: string;
    carModel: { id: number; model: string };
  };
  customer: { id: number; name: string };
};

export class ResponseContractChoiceDTO {
  data: {
    id: number;
    contractName: string;
  }[];

  constructor(contracts: DraftContractWithRelations[]) {
    this.data = contracts.map((contract) => ({
      id: contract.id,
      contractName: `${contract.car.carModel.model} - ${contract.customer.name} 고객님`,
    }));
  }
}

type DraftContractWithRelations = Contract & {
  car: {
    id: number;
    carNumber: string;
    carModel: { id: number; model: string };
  };
  customer: { id: number; name: string };
};
