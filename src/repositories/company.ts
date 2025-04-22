import { Prisma } from '@prisma/client';
import prisma from '../config/prismaClient';

export async function create(company: Prisma.CompanyCreateInput) {
  return await prisma.company.create({
    data: company,
  });
}
