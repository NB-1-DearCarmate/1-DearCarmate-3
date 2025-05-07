import contractDocRepository from '../repositories/contractDocRepository';
import { CreateDocumentDTO } from '../lib/dtos/contractDocDTO';
import NotFoundError from '../lib/errors/NotFoundError';
import { Prisma } from '@prisma/client';

async function createDocument(fileName: string, filePath: string, fileSize: number) {
  return await contractDocRepository.create(new CreateDocumentDTO(fileName, filePath, fileSize));
}

async function getDocumentById(id: number) {
  const document = await contractDocRepository.findById(id);
  if (!document) {
    throw new NotFoundError('ContractDocument', id);
  }
  return document;
}

async function getDocumentWithCompany(id: number) {
  const document = await contractDocRepository.findWithCompanyByDocumentId(id);
  if (!document) {
    throw new NotFoundError('ContractDocument', id);
  }
  return document;
}

export default {
  createDocument,
  getDocumentById,
  getDocumentWithCompany,
};
