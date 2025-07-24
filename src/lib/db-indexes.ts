import { prisma } from './prisma'

interface IndexInfo {
  name: string
  table: string
  columns: string[]
  unique: boolean
  reason: string
}

export class DatabaseIndexOptimizer {
  // 推荐的索引配置
  private recommendedIndexes: IndexInfo[] = [
    // 用户相关索引
    {
      name: 'idx_user_email',
      table: 'User',
      columns: ['email'],
      unique: true,
      reason: '用户登录查询优化'
    },
    {
      name: 'idx_user_username',
      table: 'User',
      columns: ['username'],
      unique: true,
      reason: '用户名查询优化'
    },
    {
      name: 'idx_user_role_created',
      table: 'User',
      columns: ['role', 'createdAt'],
      unique: false,
      reason: '管理员用户列表查询优化'
    },

    // 导航项索引
    {
      name: 'idx_navigation_parent_"order"',
      table: 'NavigationItem',
      columns: ['parentId', '"order"'],
      unique: false,
      reason: '导航菜单层级查询优化'
    },
    {
      name: 'idx_navigation_href',
      table: 'NavigationItem',
      columns: ['href'],
      unique: false,
      reason: '路由查找优化'
    },

    // 游戏特色索引
    {
      name: 'idx_gamefeature_active_"order"',
      table: 'GameFeature',
      columns: ['isActive', '"order"'],
      unique: false,
      reason: '首页特色展示查询优化'
    },

    // 游戏截图索引
    {
      name: 'idx_gamescreenshot_active',
      table: 'GameScreenshot',
      columns: ['isActive'],
      unique: false,
      reason: '活跃截图查询优化'
    },

    // 职业相关索引
    {
      name: 'idx_jobclass_category_"order"',
      table: 'JobClass',
      columns: ['category', '"order"'],
      unique: false,
      reason: '职业分类查询优化'
    },
    {
      name: 'idx_jobclass_active_"order"',
      table: 'JobClass',
      columns: ['isActive', '"order"'],
      unique: false,
      reason: '活跃职业排序查询优化'
    },

    // 职业类别索引
    {
      name: 'idx_jobcategory_active_"order"',
      table: 'JobCategory',
      columns: ['isActive', '"order"'],
      unique: false,
      reason: '职业类别排序查询优化'
    },

    // 团队实例索引
    {
      name: 'idx_teaminstance_category_"order"',
      table: 'TeamInstance',
      columns: ['category', '"order"'],
      unique: false,
      reason: '团队副本分类查询优化'
    },
    {
      name: 'idx_teaminstance_active_level',
      table: 'TeamInstance',
      columns: ['isActive', 'level'],
      unique: false,
      reason: '副本等级筛选优化'
    },

    // 历史时刻索引
    {
      name: 'idx_historicalmoment_active_"order"',
      table: 'HistoricalMoment',
      columns: ['isActive', '"order"'],
      unique: false,
      reason: '历史时刻展示查询优化'
    },

    // 新闻文章索引
    {
      name: 'idx_newspost_published_date',
      table: 'NewsPost',
      columns: ['isPublished', 'publishedAt'],
      unique: false,
      reason: '新闻发布时间查询优化'
    },
    {
      name: 'idx_newspost_created',
      table: 'NewsPost',
      columns: ['createdAt'],
      unique: false,
      reason: '新闻创建时间查询优化'
    },

    // 媒体资源索引
    {
      name: 'idx_mediaasset_filename',
      table: 'MediaAsset',
      columns: ['filename'],
      unique: false,
      reason: '文件名查询优化'
    },
    {
      name: 'idx_mediaasset_mimetype',
      table: 'MediaAsset',
      columns: ['mimeType'],
      unique: false,
      reason: '文件类型筛选优化'
    }
  ]

  // 创建所有推荐索引
  async createAllIndexes() {
    console.log('🚀 开始创建数据库索引...')

    for (const index of this.recommendedIndexes) {
      try {
        await this.createIndex(index)
        console.log(`✅ 索引创建成功: ${index.name}`)
      } catch (error) {
        console.error(`❌ 索引创建失败: ${index.name}`, error)
      }
    }

    console.log('🎉 索引创建完成！')
  }

  // 创建单个索引
  private async createIndex(index: IndexInfo) {
    const uniqueClause = index.unique ? 'UNIQUE' : ''
    const columnsStr = index.columns.join(', ')

    const sql = `
      CREATE ${uniqueClause} INDEX IF NOT EXISTS ${index.name}
      ON ${index.table} (${columnsStr})
    `.trim()

    await prisma.$executeRawUnsafe(sql)
  }

  // 分析查询性能
  async analyzeQueryPerformance() {
    console.log('📊 开始分析查询性能...')

    const analyses = [
      {
        name: '用户查询',
        query: 'EXPLAIN QUERY PLAN SELECT * FROM User WHERE email = ?'
      },
      {
        name: '游戏特色查询',
        query: 'EXPLAIN QUERY PLAN SELECT * FROM GameFeature WHERE isActive = 1 ORDER BY ""order""'
      },
      {
        name: '职业分类查询',
        query: 'EXPLAIN QUERY PLAN SELECT * FROM JobClass WHERE category = ? AND isActive = 1 ORDER BY ""order""'
      },
      {
        name: '新闻发布查询',
        query: 'EXPLAIN QUERY PLAN SELECT * FROM NewsPost WHERE isPublished = 1 ORDER BY publishedAt DESC'
      }
    ]

    for (const analysis of analyses) {
      try {
        console.log(`\n🔍 ${analysis.name}:`)
        const result = await prisma.$queryRawUnsafe(analysis.query)
        console.table(result)
      } catch (error) {
        console.error(`❌ 分析失败: ${analysis.name}`, error)
      }
    }
  }

  // 检查索引使用情况
  async checkIndexUsage() {
    try {
      const result = await prisma.$queryRawUnsafe(`
        SELECT name, tbl_name, sql
        FROM sqlite_master
        WHERE type = 'index'
        AND name NOT LIKE 'sqlite_%'
        ORDER BY tbl_name, name
      `)

      console.log('📋 当前数据库索引:')
      console.table(result)

      return result
    } catch (error) {
      console.error('❌ 检查索引失败:', error)
      return []
    }
  }

  // 优化数据库设置
  async optimizeDatabase() {
    console.log('⚡ 开始优化数据库设置...')

    const optimizations = [
      // 启用WAL模式以支持并发
      'PRAGMA journal_mode=WAL',

      // 设置同步模式为NORMAL以平衡性能和安全性
      'PRAGMA synchronous = NORMAL',

      // 增加缓存大小 (10MB)
      'PRAGMA cache_size = -10000',

      // 启用内存临时存储
      'PRAGMA temp_store = memory',

      // 设置页面大小 (4KB)
      'PRAGMA page_size = 4096',

      // 启用外键约束
      'PRAGMA foreign_keys = ON',

      // 设置查询优化器
      'PRAGMA optimize'
    ]

    for (const pragma of optimizations) {
      try {
        await prisma.$executeRawUnsafe(pragma)
        console.log(`✅ ${pragma}`)
      } catch (error) {
        console.error(`❌ 优化失败: ${pragma}`, error)
      }
    }

    console.log('🎉 数据库优化完成！')
  }

  // 获取数据库统计信息
  async getDatabaseStats() {
    try {
      const stats = await prisma.$queryRawUnsafe(`
        SELECT
          name as table_name,
          (SELECT COUNT(*) FROM pragma_table_info(name)) as column_count
        FROM sqlite_master
        WHERE type = 'table'
        AND name NOT LIKE 'sqlite_%'
        AND name != '_prisma_migrations'
      `)

      console.log('📊 数据库表统计:')
      console.table(stats)

      return stats
    } catch (error) {
      console.error('❌ 获取统计信息失败:', error)
      return []
    }
  }
}

// 导出优化器实例
export const dbOptimizer = new DatabaseIndexOptimizer()
