// src/types.d.ts
import { PrismaClient } from '@prisma/client';

// Extend Express Request type to include Prisma Client
declare global {
  namespace Express {
    interface Request {
      prisma: PrismaClient;
    }
  }
}