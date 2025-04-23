import { Prisma } from '@prisma/client';
import prisma from '../config/prismaClient';

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

async function remove(id: number) {
  return await prisma.user.delete({
    where: {
      id: id,
    },
  });
}

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
  create,
  update,
  remove,
  findById,
  findByEmail,
  getEntityName,
};
