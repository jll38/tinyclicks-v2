import { PrismaClient } from "@prisma/client";

export class Prisma {
  instance : PrismaClient | null = null;

  getInstance(): PrismaClient {
    if (this.instance === null) {
      this.instance = new PrismaClient();
    }
    return this.instance;
  }
}
