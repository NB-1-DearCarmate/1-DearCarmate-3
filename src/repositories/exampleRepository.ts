import { Prisma } from '@prisma/client';
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

async function create(user: Prisma.UserUncheckedCreateInput) {
  return await prisma.user.create({
    data: user,
  });
}

async function update(id: number, data: Prisma.UserUncheckedUpdateInput) {
  return await prisma.user.update({
    where: {
      id,
    },
    data: data,
  });
}

function getEntityName() {
  return prisma.user.getEntityName();
}

export default {
  findById,
  findByEmail,
  create,
  update,
  getEntityName,
};
