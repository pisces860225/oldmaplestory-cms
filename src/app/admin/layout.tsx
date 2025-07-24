import { ReactNode } from 'react'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#1a1612]">
      {/* Admin Navigation */}
      <nav className="admin-nav px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-[#d4af37] text-xl font-bold">楓之谷 CMS 後台</h1>
            <div className="flex space-x-6">
              <a href="/admin" className="text-[#d4af37] hover:text-[#ffd700] transition-colors">
                總覽
              </a>
              <a href="/admin/site-settings" className="text-[#d4af37] hover:text-[#ffd700] transition-colors">
                網站設定
              </a>
              <a href="/admin/game-features" className="text-[#d4af37] hover:text-[#ffd700] transition-colors">
                遊戲特色
              </a>
              <a href="/admin/job-classes" className="text-[#d4af37] hover:text-[#ffd700] transition-colors">
                職業管理
              </a>
              <a href="/admin/team-instances" className="text-[#d4af37] hover:text-[#ffd700] transition-colors">
                組隊副本
              </a>
              <a href="/admin/historical-moments" className="text-[#d4af37] hover:text-[#ffd700] transition-colors">
                歷史合影
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/" className="admin-button-secondary px-4 py-2 rounded">
              查看網站
            </a>
            <button className="admin-button px-4 py-2 rounded">
              登出
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {children}
      </main>
    </div>
  )
}
