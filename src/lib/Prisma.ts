import { PrismaClient } from "@prisma/client";

export class Prisma {
  static instance : PrismaClient | null = null;

  static getInstance(): PrismaClient {
    if (this.instance === null) {
      this.instance = new PrismaClient();
    }
    return this.instance;
  }
}
