import { Prisma } from '@prisma/client';
import prisma from '../config/prismaClient';

async function create(contractDocument: Prisma.ContractDocumentUncheckedCreateInput) {
  return await prisma.contractDocument.create({
    data: contractDocument,
  });
}

// async function findWithCompanyByDocumentId(
//   params: Omit<Prisma.ContractDocumentFindUniqueArgs, 'include'> & {
//     include: {
//       contract: {
//         include: {
//           company: true;
//         };
//       };
//     };
//   },
// ) {
//   return await prisma.contractDocument.findUnique(params);
// }

// contractDcmtRepository.ts
async function findWithCompanyByDocumentId(id: number) {
  return await prisma.contractDocument.findUnique({
    where: { id },
    include: {
      contract: {
        include: {
          user: {
            include: {
              company: true,
            },
          },
        },
      },
    },
  });
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
