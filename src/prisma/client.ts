import { PrismaClient, PrismaPromise } from '@prisma/client';

const prisma = new PrismaClient();

export { prisma, PrismaPromise };