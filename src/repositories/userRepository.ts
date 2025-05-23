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

async function findMany(params: Prisma.UserFindManyArgs) {
  return await prisma.user.findMany({
    ...params,
    include: {
      company: {
        select: { companyName: true },
      },
    },
  });
}

async function findCompanyIdbyUserId(userId: number) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      companyId: true,
    },
  });
}

async function getCount(params: Prisma.UserCountArgs) {
  return await prisma.user.count({
    ...params,
  });
}

export default {
  create,
  update,
  remove,
  findById,
  findByEmail,
  findMany,
  findCompanyIdbyUserId,
  getCount,
};
