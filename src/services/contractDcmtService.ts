import contractDcmtRepository from '../repositories/contractDcmtRepository';
import { CreateDocumentDTO } from '../lib/dtos/contractDcmtDTO';
import NotFoundError from '../lib/errors/NotFoundError';
import { Prisma } from '@prisma/client';

async function createDocument(data: CreateDocumentDTO) {
  return await contractDcmtRepository.create(data);
}

async function getDocumentById(id: number) {
  const document = await contractDcmtRepository.findById(id);
  if (!document) {
    throw new NotFoundError('ContractDocument', id);
  }
  return document;
}

async function getDocumentWithCompany(id: number) {
  let prismaParams: {
    include: {
      contract: {
        include: {
          company: true;
        };
      };
    };
    where: Prisma.ContractDocumentWhereUniqueInput;
  } = {
    include: {
      contract: {
        include: {
          company: true,
        },
      },
    },
    where: {
      id: id,
    },
  };
  const document = await contractDcmtRepository.findWithCompanyByDocumentId(id);
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
