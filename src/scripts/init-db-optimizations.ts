#!/usr/bin/env bun

import { dbOptimizer } from '../lib/db-indexes'
import { backupManager } from '../lib/db-backup'
import { dbCache } from '../lib/db-cache'
import { dbMonitor } from '../lib/db-monitor'

async function initializeDatabaseOptimizations() {
  console.log('🚀 开始初始化数据库优化...\n')

  try {
    // 1. 数据库设置优化
    console.log('⚡ 步骤 1: 优化数据库设置')
    await dbOptimizer.optimizeDatabase()
    console.log('✅ 数据库设置优化完成\n')

    // 2. 创建索引
    console.log('📊 步骤 2: 创建优化索引')
    await dbOptimizer.createAllIndexes()
    console.log('✅ 索引创建完成\n')

    // 3. 创建初始备份
    console.log('💾 步骤 3: 创建初始备份')
    const backup = await backupManager.createBackup('manual', '数据库优化完成后的初始备份')
    console.log(`✅ 初始备份创建完成: ${backup.filename}\n`)

    // 4. 验证优化效果
    console.log('🔍 步骤 4: 验证优化效果')
    const stats = backupManager.getBackupStats()
    console.log('📈 备份统计:', stats)

    const cacheStats = dbCache.getStats()
    console.log('🏎️  缓存统计:', cacheStats)

    const monitorStats = dbMonitor.getMetrics()
    console.log('📊 监控统计:', monitorStats)
    console.log('✅ 验证完成\n')

    console.log('🎉 数据库优化初始化成功完成!')
    console.log('\n📋 优化功能概览:')
    console.log('  • 性能监控: 查询时间跟踪、慢查询检测')
    console.log('  • 索引优化: 自动创建最优索引以提升查询速度')
    console.log('  • 连接池监控: 实时监控数据库连接状态')
    console.log('  • 备份恢复: 自动和手动备份机制')
    console.log('  • 缓存层: 内存缓存减少数据库负载')
    console.log('\n🔗 访问监控面板: /api/admin/db-monitor')

  } catch (error) {
    console.error('❌ 数据库优化初始化失败:', error)
    process.exit(1)
  }
}

// 运行初始化
if (require.main === module) {
  initializeDatabaseOptimizations()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('初始化脚本执行失败:', error)
      process.exit(1)
    })
}
