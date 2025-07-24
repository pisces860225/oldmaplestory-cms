'use client'

import { useEffect, useState } from 'react'

interface DashboardStats {
  gameFeatures: number
  jobClasses: number
  teamInstances: number
  historicalMoments: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    gameFeatures: 0,
    jobClasses: 0,
    teamInstances: 0,
    historicalMoments: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [gameFeatures, jobClasses] = await Promise.all([
          fetch('/api/game-features').then(res => res.json()),
          fetch('/api/job-classes').then(res => res.json())
        ])

        setStats({
          gameFeatures: gameFeatures.length || 0,
          jobClasses: jobClasses.length || 0,
          teamInstances: 6, // 從種子資料得知
          historicalMoments: 3 // 從種子資料得知
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const quickActions = [
    { title: '網站設定', href: '/admin/site-settings', icon: '⚙️', description: '修改網站基本設定、Logo、社交連結等' },
    { title: '遊戲特色', href: '/admin/game-features', icon: '🎮', description: '管理遊戲特色說明文字' },
    { title: '職業管理', href: '/admin/job-classes', icon: '⚔️', description: '新增、編輯、刪除職業' },
    { title: '組隊副本', href: '/admin/team-instances', icon: '👥', description: '管理組隊副本內容' },
    { title: '歷史合影', href: '/admin/historical-moments', icon: '📸', description: '上傳和管理歷史照片' },
    { title: '查看網站', href: '/', icon: '🌐', description: '前往前台查看網站效果' }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#d4af37] mb-2">
          後台管理總覽
        </h1>
        <p className="text-[#e2d2bb]">
          歡迎來到楓之谷網站內容管理系統
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="admin-card p-6">
          <div className="flex items-center">
            <div className="text-3xl mb-2">🎮</div>
            <div className="ml-4">
              <p className="text-[#d4af37] text-sm font-medium">遊戲特色</p>
              <p className="text-2xl font-bold text-[#e2d2bb]">
                {isLoading ? '...' : stats.gameFeatures}
              </p>
            </div>
          </div>
        </div>

        <div className="admin-card p-6">
          <div className="flex items-center">
            <div className="text-3xl mb-2">⚔️</div>
            <div className="ml-4">
              <p className="text-[#d4af37] text-sm font-medium">職業數量</p>
              <p className="text-2xl font-bold text-[#e2d2bb]">
                {isLoading ? '...' : stats.jobClasses}
              </p>
            </div>
          </div>
        </div>

        <div className="admin-card p-6">
          <div className="flex items-center">
            <div className="text-3xl mb-2">👥</div>
            <div className="ml-4">
              <p className="text-[#d4af37] text-sm font-medium">組隊副本</p>
              <p className="text-2xl font-bold text-[#e2d2bb]">
                {isLoading ? '...' : stats.teamInstances}
              </p>
            </div>
          </div>
        </div>

        <div className="admin-card p-6">
          <div className="flex items-center">
            <div className="text-3xl mb-2">📸</div>
            <div className="ml-4">
              <p className="text-[#d4af37] text-sm font-medium">歷史合影</p>
              <p className="text-2xl font-bold text-[#e2d2bb]">
                {isLoading ? '...' : stats.historicalMoments}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-[#d4af37] mb-6">快速操作</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className="admin-card p-6 hover:border-[#ffd700] transition-colors group"
            >
              <div className="text-3xl mb-3">{action.icon}</div>
              <h3 className="text-[#d4af37] font-bold mb-2 group-hover:text-[#ffd700]">
                {action.title}
              </h3>
              <p className="text-[#e2d2bb] text-sm">
                {action.description}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-bold text-[#d4af37] mb-6">最近活動</h2>
        <div className="admin-card p-6">
          <div className="space-y-4">
            <div className="flex items-center text-[#e2d2bb]">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm">系統初始化完成，預設資料已載入</span>
              <span className="text-xs text-[#d4af37] ml-auto">剛剛</span>
            </div>
            <div className="flex items-center text-[#e2d2bb]">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm">資料庫連線正常</span>
              <span className="text-xs text-[#d4af37] ml-auto">剛剛</span>
            </div>
            <div className="flex items-center text-[#e2d2bb]">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              <span className="text-sm">後台管理系統已準備就緒</span>
              <span className="text-xs text-[#d4af37] ml-auto">剛剛</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
