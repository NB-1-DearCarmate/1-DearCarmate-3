import prisma from '../config/prismaClient';

async function findById(id: number) {
  return await prisma.uSER.findUnique({
    where: {
      id,
    },
  });
}

async function findByEmail(email: string) {
  return await prisma.uSER.findUnique({
    where: {
      email,
    },
  });
}

function getEntityName() {
  return prisma.uSER.getEntityName();
}

export default {
  findById,
  findByEmail,
  getEntityName,
};
