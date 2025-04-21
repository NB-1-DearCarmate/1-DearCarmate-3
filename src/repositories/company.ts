import { Prisma } from '@prisma/client';
import prisma from '../config/prismaClient';

export async function create(company: Prisma.COMPANYCreateInput) {
  return await prisma.cOMPANY.create({
    data: company,
  });
}
