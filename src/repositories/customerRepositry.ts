import { Prisma } from '@prisma/client';
import prisma from '../config/prismaClient';

async function create(data: Prisma.CustomerCreateInput) {
  return await prisma.customer.create({
    data,
  });
}

export default {
  create,
};
