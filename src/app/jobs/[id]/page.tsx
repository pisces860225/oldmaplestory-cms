interface JobPageProps {
  params: { id: string }
}

export default function JobPage({ params }: JobPageProps) {
  const jobId = params.id

  // 模拟职业数据
  const jobData = {
    "warrior": { name: "英雄", description: "近战战士，拥有强大的攻击力和防御力", skills: ["斗气集中", "终极斩击", "战神降临"] },
    "magician": { name: "圣骑士", description: "神圣的魔法师，掌握光明与治疗魔法", skills: ["圣光术", "治愈术", "神圣保护"] },
    "archer": { name: "神射手", description: "远程攻击专家，精准的箭术无人能敌", skills: ["穿透射击", "集中射击", "箭雨"] },
    "thief": { name: "暗影双刃", description: "敏捷的盗贼，擅长暗杀和偷袭", skills: ["暗影突袭", "隐身术", "毒刃"] },
    "pirate": { name: "船长", description: "海上的霸者，使用枪械和格斗技巧", skills: ["连发射击", "船长指挥", "海盗冲击"] }
  }

  const job = jobData[jobId as keyof typeof jobData] || jobData.warrior

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="glass-card p-8 mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">{job.name}</h1>
          <p className="text-gray-300 text-lg">{job.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card p-6">
            <h3 className="text-2xl font-bold text-white mb-4">技能介绍</h3>
            <div className="space-y-3">
              {job.skills.map((skill, index) => (
                <div key={index} className="glass-button p-3">
                  <h4 className="text-white font-semibold">{skill}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-2xl font-bold text-white mb-4">职业特色</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-white font-semibold">攻击方式</h4>
                <p className="text-gray-300">根据职业特性进行战斗</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="text-white font-semibold">成长路线</h4>
                <p className="text-gray-300">多样化的转职发展路径</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="glass-button px-6 py-3 text-white hover:text-blue-300">
            ← 返回首页
          </a>
        </div>
      </div>
    </div>
  )
}
