interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

interface CacheStats {
  hits: number
  misses: number
  sets: number
  deletes: number
  hitRate: number
}

export class DatabaseCache {
  private cache = new Map<string, CacheEntry<any>>()
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    sets: 0,
    deletes: 0,
    hitRate: 0
  }
  private defaultTTL = 5 * 60 * 1000 // 5分钟默认缓存时间

  // 设置缓存
  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl
    }

    this.cache.set(key, entry)
    this.stats.sets++
    this.updateHitRate()

    // 设置自动过期
    setTimeout(() => {
      this.delete(key)
    }, ttl)
  }

  // 获取缓存
  get<T>(key: string): T | null {
    const entry = this.cache.get(key)

    if (!entry) {
      this.stats.misses++
      this.updateHitRate()
      return null
    }

    // 检查是否过期
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.delete(key)
      this.stats.misses++
      this.updateHitRate()
      return null
    }

    this.stats.hits++
    this.updateHitRate()
    return entry.data as T
  }

  // 删除缓存
  delete(key: string): boolean {
    const deleted = this.cache.delete(key)
    if (deleted) {
      this.stats.deletes++
    }
    return deleted
  }

  // 清空缓存
  clear(): void {
    this.cache.clear()
    this.stats.deletes += this.cache.size
  }

  // 检查缓存是否存在且未过期
  has(key: string): boolean {
    return this.get(key) !== null
  }

  // 更新命中率
  private updateHitRate(): void {
    const total = this.stats.hits + this.stats.misses
    this.stats.hitRate = total > 0 ? (this.stats.hits / total) * 100 : 0
  }

  // 获取缓存统计
  getStats(): CacheStats {
    return { ...this.stats }
  }

  // 获取缓存大小
  size(): number {
    return this.cache.size
  }

  // 清理过期缓存
  cleanup(): number {
    let cleaned = 0
    const now = Date.now()

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key)
        cleaned++
      }
    }

    return cleaned
  }
}

// 创建全局缓存实例
export const dbCache = new DatabaseCache()

// 缓存装饰器函数
export function cached<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  keyGenerator: (...args: T) => string,
  ttl?: number
) {
  return async (...args: T): Promise<R> => {
    const key = keyGenerator(...args)

    // 尝试从缓存获取
    const cached = dbCache.get<R>(key)
    if (cached !== null) {
      return cached
    }

    // 执行原函数
    const result = await fn(...args)

    // 缓存结果
    dbCache.set(key, result, ttl)

    return result
  }
}

// 自动清理过期缓存
setInterval(() => {
  const cleaned = dbCache.cleanup()
  if (cleaned > 0) {
    console.log(`🧹 清理了 ${cleaned} 个过期缓存项`)
  }
}, 60000) // 每分钟清理一次
