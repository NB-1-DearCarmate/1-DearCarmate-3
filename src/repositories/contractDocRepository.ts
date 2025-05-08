import { Prisma } from '@prisma/client';
import prisma from '../config/prismaClient';

async function create(contractDocument: Prisma.ContractDocumentUncheckedCreateInput) {
  return await prisma.contractDocument.create({
    data: contractDocument,
  });
}

async function findWithCompanyByDocumentId(id: number) {
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
  return await prisma.contractDocument.findUnique(prismaParams);
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
