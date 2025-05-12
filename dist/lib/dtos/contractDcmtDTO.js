"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseContractChoiceDTO = exports.ResponseContractDcmtDTO = exports.ResponseContractDcmtsDTO = exports.ResponseDocumentIdDTO = exports.CreateDocumentDTO = void 0;
class CreateDocumentDTO {
    constructor(fileName, filePath, fileSize, contractId) {
        this.fileName = fileName;
        this.filePath = filePath;
        this.fileSize = fileSize;
        this.contractId = contractId;
    }
}
exports.CreateDocumentDTO = CreateDocumentDTO;
class ResponseDocumentIdDTO {
    constructor(contractDocumentId) {
        this.contractDocumentId = contractDocumentId;
    }
}
exports.ResponseDocumentIdDTO = ResponseDocumentIdDTO;
class ResponseContractDcmtsDTO {
    constructor(contracts, currentPage, pageSize, totalItemCount) {
        this.currentPage = currentPage;
        this.totalItemCount = totalItemCount;
        this.totalPages = Math.ceil(totalItemCount / pageSize);
        this.data = contracts.map((contract) => new ResponseContractDcmtDTO(contract));
    }
}
exports.ResponseContractDcmtsDTO = ResponseContractDcmtsDTO;
class ResponseContractDcmtDTO {
    constructor(contract) {
        this.id = contract.id;
        this.contractName = `${contract.car.carModel.model} - ${contract.customer.name} 고객님`;
        this.resolutionDate = contract.resolutionDate ? contract.resolutionDate.toISOString() : null;
        this.documentsCount = contract.contractDocuments.length;
        this.manager = contract.user.name;
        this.carNumber = contract.car.carNumber;
        this.documents = contract.contractDocuments.map((doc) => ({
            id: doc.id,
            fileName: doc.fileName,
        }));
    }
}
exports.ResponseContractDcmtDTO = ResponseContractDcmtDTO;
class ResponseContractChoiceDTO {
    constructor(contracts) {
        this.data = contracts.map((contract) => ({
            id: contract.id,
            contractName: `${contract.car.carModel.model} - ${contract.customer.name} 고객님`,
        }));
    }
}
exports.ResponseContractChoiceDTO = ResponseContractChoiceDTO;
