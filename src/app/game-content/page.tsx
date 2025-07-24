export default function GameContentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="glass-card p-8 mb-8">
          <h1 className="text-4xl font-bold text-white mb-6 text-center">游戏内容</h1>
          <p className="text-gray-300 text-center text-lg">探索楓之谷的精彩内容</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6 card-hover">
            <h3 className="text-xl font-bold text-white mb-4">副本系统</h3>
            <p className="text-gray-300 mb-4">挑战各种副本，获得丰富奖励</p>
            <ul className="text-gray-400 space-y-2">
              <li>• 时空的裂缝</li>
              <li>• 雷龙森林</li>
              <li>• 文艺的遗迹</li>
            </ul>
          </div>

          <div className="glass-card p-6 card-hover">
            <h3 className="text-xl font-bold text-white mb-4">任务系统</h3>
            <p className="text-gray-300 mb-4">丰富的任务线，体验精彩剧情</p>
            <ul className="text-gray-400 space-y-2">
              <li>• 主线任务</li>
              <li>• 支线任务</li>
              <li>• 每日任务</li>
            </ul>
          </div>

          <div className="glass-card p-6 card-hover">
            <h3 className="text-xl font-bold text-white mb-4">装备系统</h3>
            <p className="text-gray-300 mb-4">打造专属装备，提升战斗力</p>
            <ul className="text-gray-400 space-y-2">
              <li>• 装备强化</li>
              <li>• 潜能觉醒</li>
              <li>• 装备制作</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
