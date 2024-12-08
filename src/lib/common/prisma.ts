import { PrismaClient } from '@prisma/client'
import baseLogger from "$lib/common/winston";

let logger = baseLogger.child({tags:["prisma","init"], origin: "$lib/common/prisma.ts"});

logger.info("Avant création du Prisma Client");
const prisma = new PrismaClient()
logger.info("Après création du Prisma Client");

export default prisma;