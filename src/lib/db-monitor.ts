import { PrismaClient } from '@prisma/client'

export interface QueryMetrics {
  query: string
  duration: number
  timestamp: Date
  success: boolean
  error?: string
}

export interface ConnectionMetrics {
  activeConnections: number
  totalQueries: number
  averageQueryTime: number
  slowQueries: number
  errors: number
  uptime: number
}

class DatabaseMonitor {
  private metrics: QueryMetrics[] = []
  private connectionMetrics: ConnectionMetrics = {
    activeConnections: 0,
    totalQueries: 0,
    averageQueryTime: 0,
    slowQueries: 0,
    errors: 0,
    uptime: Date.now()
  }
  private slowQueryThreshold = 100 // ms
  private maxMetricsHistory = 1000

  // 记录查询性能
  recordQuery(query: string, duration: number, success: boolean, error?: string) {
    const metric: QueryMetrics = {
      query: this.sanitizeQuery(query),
      duration,
      timestamp: new Date(),
      success,
      error
    }

    this.metrics.push(metric)

    // 保持历史记录在合理范围内
    if (this.metrics.length > this.maxMetricsHistory) {
      this.metrics.shift()
    }

    // 更新连接指标
    this.updateConnectionMetrics(metric)

    // 记录慢查询
    if (duration > this.slowQueryThreshold) {
      this.logSlowQuery(metric)
    }
  }

  private sanitizeQuery(query: string): string {
    // 移除敏感信息，只保留查询结构
    return query
      .replace(/\$\d+/g, '?')
      .replace(/['"][^'"]*['"]/g, '?')
      .substring(0, 200)
  }

  private updateConnectionMetrics(metric: QueryMetrics) {
    this.connectionMetrics.totalQueries++

    if (!metric.success) {
      this.connectionMetrics.errors++
    }

    if (metric.duration > this.slowQueryThreshold) {
      this.connectionMetrics.slowQueries++
    }

    // 计算平均查询时间
    const totalTime = this.metrics.reduce((sum, m) => sum + m.duration, 0)
    this.connectionMetrics.averageQueryTime = totalTime / this.metrics.length
  }

  private logSlowQuery(metric: QueryMetrics) {
    console.warn(`🐌 慢查询检测:`, {
      query: metric.query,
      duration: `${metric.duration}ms`,
      timestamp: metric.timestamp.toISOString()
    })
  }

  // 获取性能统计
  getMetrics(): ConnectionMetrics {
    return {
      ...this.connectionMetrics,
      uptime: Date.now() - this.connectionMetrics.uptime
    }
  }

  // 获取查询历史
  getQueryHistory(limit = 50): QueryMetrics[] {
    return this.metrics.slice(-limit)
  }

  // 获取慢查询
  getSlowQueries(limit = 20): QueryMetrics[] {
    return this.metrics
      .filter(m => m.duration > this.slowQueryThreshold)
      .slice(-limit)
  }

  // 清理旧数据
  cleanup() {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    this.metrics = this.metrics.filter(m => m.timestamp > oneHourAgo)
  }
}

// 创建全局监控实例
export const dbMonitor = new DatabaseMonitor()

// Prisma中间件扩展
export function createMonitoredPrisma(): PrismaClient {
  const prisma = new PrismaClient({
    log: [
      { level: 'query', emit: 'event' },
      { level: 'error', emit: 'event' },
      { level: 'warn', emit: 'event' }
    ]
  })

  // 监听查询事件
  prisma.$on('query', (e) => {
    dbMonitor.recordQuery(e.query, e.duration, true)
  })

  // 监听错误事件
  prisma.$on('error', (e) => {
    console.error('🚨 数据库错误:', e)
    dbMonitor.recordQuery('ERROR', 0, false, e.message)
  })

  // 添加查询中间件
  prisma.$use(async (params, next) => {
    const start = Date.now()

    try {
      const result = await next(params)
      const duration = Date.now() - start

      dbMonitor.recordQuery(
        `${params.model}.${params.action}`,
        duration,
        true
      )

      return result
    } catch (error) {
      const duration = Date.now() - start
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'

      dbMonitor.recordQuery(
        `${params.model}.${params.action}`,
        duration,
        false,
        errorMessage
      )

      throw error
    }
  })

  return prisma
}
