import { NextResponse } from 'next/server'
import { dbMonitor } from '@/lib/db-monitor'
import { dbOptimizer } from '@/lib/db-indexes'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    switch (action) {
      case 'metrics':
        return NextResponse.json({
          metrics: dbMonitor.getMetrics(),
          queryHistory: dbMonitor.getQueryHistory(20),
          slowQueries: dbMonitor.getSlowQueries(10)
        })

      case 'optimize':
        await dbOptimizer.optimizeDatabase()
        await dbOptimizer.createAllIndexes()
        return NextResponse.json({
          success: true,
          message: '数据库优化完成'
        })

      case 'cleanup':
        dbMonitor.cleanup()
        return NextResponse.json({
          success: true,
          message: '监控数据清理完成'
        })

      default:
        return NextResponse.json({
          metrics: dbMonitor.getMetrics(),
          timestamp: new Date().toISOString()
        })
    }
  } catch (error) {
    console.error('数据库监控API错误:', error)
    return NextResponse.json(
      { error: '获取监控数据失败' },
      { status: 500 }
    )
  }
}
