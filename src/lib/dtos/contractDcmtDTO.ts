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
