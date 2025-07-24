export default function MorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="glass-card p-8 mb-8">
          <h1 className="text-4xl font-bold text-white mb-6 text-center">更多信息</h1>
          <p className="text-gray-300 text-center text-lg">了解更多关于楓之谷的信息</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card p-6">
            <h3 className="text-2xl font-bold text-white mb-4">游戏公告</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-white font-semibold">系统维护公告</h4>
                <p className="text-gray-300 text-sm">2025/01/15 - 系统维护更新</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="text-white font-semibold">新版本更新</h4>
                <p className="text-gray-300 text-sm">2025/01/10 - Ver.113 正式上线</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-2xl font-bold text-white mb-4">社群连结</h3>
            <div className="space-y-3">
              <a href="#" className="glass-button block p-3 text-white hover:text-blue-300">
                Discord 官方群组
              </a>
              <a href="#" className="glass-button block p-3 text-white hover:text-blue-300">
                Facebook 粉丝页
              </a>
              <a href="#" className="glass-button block p-3 text-white hover:text-blue-300">
                官方论坛
              </a>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-2xl font-bold text-white mb-4">客服支援</h3>
            <div className="space-y-3">
              <p className="text-gray-300">遇到问题？我们来帮助您！</p>
              <a href="#" className="glass-button block p-3 text-white hover:text-blue-300">
                提交客服单
              </a>
              <a href="#" className="glass-button block p-3 text-white hover:text-blue-300">
                常见问题
              </a>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-2xl font-bold text-white mb-4">下载游戏</h3>
            <div className="space-y-3">
              <p className="text-gray-300">开始您的楓之谷冒险！</p>
              <a href="#" className="glass-button block p-3 text-white hover:text-green-300 bg-green-600/20">
                下载游戏客户端
              </a>
              <p className="text-gray-400 text-sm">支持 Windows 10/11</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
