import { Prisma } from "@prisma/client";
import prisma from "../config/prismaClient";

async function create(data: {
  customerId: number;
  carId: number;
  userId: number;
  companyId: number;
  contractPrice: number;
  meetings: { time: string }[];
}) {
  return await prisma.contract.create({
    data: {
      ...data,
      status: "CONTRACT_PREPARING",
      meetings: {
        create: data.meetings,
      },
    },
    include: {
      meetings: true,
    },
  });
}

async function update(id: number, contractData: any, meetings?: { time: string }[]) {
  return await prisma.contract.update({
    where: { id },
    data: {
      ...contractData,
      ...(meetings && {
        meetings: {
          deleteMany: {},
          create: meetings,
        },
      }),
    },
    include: {
      meetings: true,
    },
  });
}

async function findAll() {
  return await prisma.contract.findMany({
    include: {
      customer: true,
      car: true,
      user: true,
      meetings: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function findById(id: number) {
  return await prisma.contract.findUnique({
    where: { id },
    include: {
      customer: true,
      car: true,
      user: true,
      meetings: true,
      contractDocuments: true,
    },
  });
}

async function deleteById(id: number) {
  return await prisma.contract.delete({
    where: { id },
  });
}

async function updateStatus(id: number, status: Prisma.ContractUpdateInput["status"], resolutionDate?: Date | null) {
  return await prisma.contract.update({
    where: { id },
    data: {
      status,
      resolutionDate: resolutionDate ?? null,
    },
  });
}

async function findCustomerDropdown(companyId: number) {
  return await prisma.customer.findMany({
    where: { companyId },
    select: {
      id: true,
      name: true,
    },
  });
}

async function findUserDropdown(companyId: number) {
  return await prisma.user.findMany({
    where: { companyId },
    select: {
      id: true,
      name: true,
    },
  });
}

async function findCarDropdown(companyId: number) {
  return await prisma.car.findMany({
    where: { companyId },
    select: {
      id: true,
      carNumber: true,
    },
  });
}

export default {
  create,
  update,
  findAll,
  findById,
  deleteById,
  updateStatus,
  findCustomerDropdown,
  findUserDropdown,
  findCarDropdown,
};
