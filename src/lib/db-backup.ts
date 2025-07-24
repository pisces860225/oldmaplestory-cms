import { existsSync, mkdirSync, copyFileSync, readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'
import { prisma } from './prisma'

export interface BackupInfo {
  filename: string
  timestamp: Date
  size: number
  type: 'auto' | 'manual'
  description?: string
}

export class DatabaseBackupManager {
  private backupDir = join(process.cwd(), 'backups')
  private dbPath = join(process.cwd(), 'prisma', 'dev.db')
  private maxBackups = 10

  constructor() {
    // 确保备份目录存在
    if (!existsSync(this.backupDir)) {
      mkdirSync(this.backupDir, { recursive: true })
    }
  }

  // 创建备份
  async createBackup(type: 'auto' | 'manual' = 'manual', description?: string): Promise<BackupInfo> {
    const timestamp = new Date()
    const dateStr = timestamp.toISOString().replace(/[:.]/g, '-').slice(0, 19)
    const filename = `backup_${type}_${dateStr}.db`
    const backupPath = join(this.backupDir, filename)

    try {
      // 执行数据库检查点以确保数据完整性
      await this.executeCheckpoint()

      // 复制数据库文件
      copyFileSync(this.dbPath, backupPath)

      // 创建元数据文件
      const metaPath = join(this.backupDir, `${filename}.meta.json`)
      const stats = statSync(backupPath)
      const backupInfo: BackupInfo = {
        filename,
        timestamp,
        size: stats.size,
        type,
        description
      }

      writeFileSync(metaPath, JSON.stringify(backupInfo, null, 2))

      console.log(`✅ 备份创建成功: ${filename}`)

      // 清理旧备份
      await this.cleanupOldBackups()

      return backupInfo
    } catch (error) {
      console.error('❌ 备份创建失败:', error)
      throw error
    }
  }

  // 执行数据库检查点
  private async executeCheckpoint() {
    try {
      await prisma.$executeRawUnsafe('PRAGMA wal_checkpoint')
      console.log('✅ 数据库检查点完成')
    } catch (error) {
      console.warn('⚠️ 检查点失败:', error)
    }
  }

  // 恢复备份
  async restoreBackup(filename: string): Promise<void> {
    const backupPath = join(this.backupDir, filename)
    const tempPath = join(this.backupDir, 'temp_restore.db')

    if (!existsSync(backupPath)) {
      throw new Error(`备份文件不存在: ${filename}`)
    }

    try {
      // 先验证备份文件完整性
      await this.validateBackup(backupPath)

      // 创建当前数据库的安全备份
      const safetyBackup = await this.createBackup('auto', '恢复前安全备份')
      console.log(`🛡️ 安全备份已创建: ${safetyBackup.filename}`)

      // 关闭当前连接
      await prisma.$disconnect()

      // 复制备份文件到临时位置
      copyFileSync(backupPath, tempPath)

      // 替换当前数据库
      copyFileSync(tempPath, this.dbPath)

      console.log(`✅ 数据库恢复成功: ${filename}`)

      // 重新连接数据库
      await prisma.$connect()

    } catch (error) {
      console.error('❌ 数据库恢复失败:', error)
      throw error
    } finally {
      // 清理临时文件
      if (existsSync(tempPath)) {
        require('fs').unlinkSync(tempPath)
      }
    }
  }

  // 验证备份文件完整性
  private async validateBackup(backupPath: string): Promise<void> {
    // 简单的文件大小检查
    const stats = statSync(backupPath)
    if (stats.size === 0) {
      throw new Error('备份文件为空')
    }

    // 可以添加更多验证逻辑，如SQLite文件头检查
    const buffer = readFileSync(backupPath, { start: 0, end: 15 })
    const header = buffer.toString('utf8')
    if (!header.startsWith('SQLite format 3')) {
      throw new Error('备份文件格式无效')
    }

    console.log('✅ 备份文件验证通过')
  }

  // 获取备份列表
  getBackupList(): BackupInfo[] {
    try {
      const files = readdirSync(this.backupDir)
      const backups: BackupInfo[] = []

      for (const file of files) {
        if (file.endsWith('.db')) {
          const metaFile = `${file}.meta.json`
          const metaPath = join(this.backupDir, metaFile)

          if (existsSync(metaPath)) {
            try {
              const meta = JSON.parse(readFileSync(metaPath, 'utf8'))
              meta.timestamp = new Date(meta.timestamp)
              backups.push(meta)
            } catch (error) {
              console.warn(`⚠️ 读取备份元数据失败: ${metaFile}`)
            }
          } else {
            // 如果没有元数据文件，创建基本信息
            const stats = statSync(join(this.backupDir, file))
            backups.push({
              filename: file,
              timestamp: stats.mtime,
              size: stats.size,
              type: 'manual'
            })
          }
        }
      }

      // 按时间排序（最新的在前面）
      return backups.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    } catch (error) {
      console.error('❌ 获取备份列表失败:', error)
      return []
    }
  }

  // 删除备份
  deleteBackup(filename: string): void {
    const backupPath = join(this.backupDir, filename)
    const metaPath = join(this.backupDir, `${filename}.meta.json`)

    try {
      if (existsSync(backupPath)) {
        require('fs').unlinkSync(backupPath)
      }
      if (existsSync(metaPath)) {
        require('fs').unlinkSync(metaPath)
      }
      console.log(`✅ 备份删除成功: ${filename}`)
    } catch (error) {
      console.error(`❌ 删除备份失败: ${filename}`, error)
      throw error
    }
  }

  // 清理旧备份
  private async cleanupOldBackups(): Promise<void> {
    const backups = this.getBackupList()
    const autoBackups = backups.filter(b => b.type === 'auto')

    if (autoBackups.length > this.maxBackups) {
      const toDelete = autoBackups.slice(this.maxBackups)

      for (const backup of toDelete) {
        try {
          this.deleteBackup(backup.filename)
          console.log(`🧹 清理旧备份: ${backup.filename}`)
        } catch (error) {
          console.warn(`⚠️ 清理备份失败: ${backup.filename}`)
        }
      }
    }
  }

  // 自动备份调度
  scheduleAutoBackup(intervalHours: number = 24): void {
    setInterval(async () => {
      try {
        await this.createBackup('auto', '定时自动备份')
      } catch (error) {
        console.error('❌ 自动备份失败:', error)
      }
    }, intervalHours * 60 * 60 * 1000)

    console.log(`⏰ 自动备份已启动，间隔: ${intervalHours}小时`)
  }

  // 获取备份统计
  getBackupStats() {
    const backups = this.getBackupList()
    const totalSize = backups.reduce((sum, backup) => sum + backup.size, 0)

    return {
      totalBackups: backups.length,
      autoBackups: backups.filter(b => b.type === 'auto').length,
      manualBackups: backups.filter(b => b.type === 'manual').length,
      totalSize,
      latestBackup: backups[0]?.timestamp,
      oldestBackup: backups[backups.length - 1]?.timestamp
    }
  }
}

// 导出备份管理器实例
export const backupManager = new DatabaseBackupManager()
