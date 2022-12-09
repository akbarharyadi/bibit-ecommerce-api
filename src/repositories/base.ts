import { PrismaClient } from '@prisma/client'

export abstract class BaseRepositories {

    getPrismaInstance() {
        return new PrismaClient();
    }
}