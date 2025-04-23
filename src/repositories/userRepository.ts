import prisma from '../config/prismaClient';

async function findById(id: number) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

async function findByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

function getEntityName() {
  return prisma.user.getEntityName();
}

export default {
  findById,
  findByEmail,
  getEntityName,
};
