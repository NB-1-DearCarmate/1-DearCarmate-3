import { Prisma } from '@prisma/client';
import prisma from '../config/prismaClient';

async function create(contractDocument: Prisma.ContractDocumentUncheckedCreateInput) {
  return await prisma.contractDocument.create({
    data: contractDocument,
  });
}

async function findWithCompanyByDocumentId(
  params: Omit<Prisma.ContractDocumentFindUniqueArgs, 'include'> & {
    include: {
      contract: {
        include: {
          company: true;
        };
      };
    };
  },
) {
  return await prisma.contractDocument.findUnique(params);
}

async function findById(id: number) {
  return await prisma.contractDocument.findUnique({
    where: {
      id,
    },
  });
}

export default {
  create,
  findWithCompanyByDocumentId,
  findById,
};
