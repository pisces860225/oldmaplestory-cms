import { PrismaClient } from '@prisma/client'
import { createMonitoredPrisma } from './db-monitor'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 使用监控版本的Prisma客户端
export const prisma =
  globalForPrisma.prisma ??
  createMonitoredPrisma()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
