'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface SiteSettings {
  siteLogo: string
  siteTitle: string
  heroTitle: string
  heroSubtitle: string
  heroLogo: string
  downloadButtonText: string
  downloadButtonUrl: string
  footerText: string
  socialDiscord?: string
  socialFacebook?: string
  socialTwitter?: string
}

interface GameFeature {
  id: string
  text: string
  order: number
}

interface JobClass {
  id: string
  name: string
  icon: string
  description: string
  category: string
  order: number
}

export default function Home() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [gameFeatures, setGameFeatures] = useState<GameFeature[]>([])
  const [jobClasses, setJobClasses] = useState<JobClass[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, featuresRes, jobsRes] = await Promise.all([
          fetch('/api/site-settings'),
          fetch('/api/game-features'),
          fetch('/api/job-classes')
        ])

        const [settingsData, featuresData, jobsData] = await Promise.all([
          settingsRes.json(),
          featuresRes.json(),
          jobsRes.json()
        ])

        setSettings(settingsData)
        setGameFeatures(featuresData)
        setJobClasses(jobsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading || !settings) {
    return (
      <div className="maple-bg min-h-screen flex items-center justify-center">
        <div className="text-[#d4af37] text-xl">載入中...</div>
      </div>
    )
  }

  return (
    <div className="maple-bg min-h-screen">
      {/* Navigation Header */}
      <nav className="flex items-center justify-between px-8 py-4 bg-black/20 backdrop-blur-sm">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src={settings.siteLogo}
            alt="MapleStory Logo"
            width={120}
            height={60}
            className="object-contain"
          />
        </div>

        {/* Navigation Menu */}
        <div className="flex items-center space-x-8">
          <a href="#" className="text-[#d4af37] hover:text-[#ffd700] transition-colors">首頁</a>
          <div className="relative group">
            <a href="#" className="text-[#d4af37] hover:text-[#ffd700] transition-colors">遊戲內容</a>
          </div>
          <div className="relative group">
            <a href="#" className="text-[#d4af37] hover:text-[#ffd700] transition-colors">更多</a>
          </div>
        </div>

        {/* Social Icons and Download Button */}
        <div className="flex items-center space-x-4">
          {settings.socialTwitter && (
            <a href={settings.socialTwitter} className="text-[#d4af37] hover:text-[#ffd700]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
          )}
          {settings.socialDiscord && (
            <a href={settings.socialDiscord} className="text-[#d4af37] hover:text-[#ffd700]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
              </svg>
            </a>
          )}
          <a href={settings.downloadButtonUrl} className="bg-[#cc5829] hover:bg-[#b8501f] text-white px-6 py-2 rounded-md font-medium transition-colors">
            {settings.downloadButtonText}
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center min-h-[60vh] px-8">
        <div className="text-center mb-8">
          <Image
            src={settings.heroLogo}
            alt={settings.heroTitle}
            width={600}
            height={300}
            className="object-contain mx-auto"
          />
          <p className="text-[#e2d2bb] text-xl mt-4">
            {settings.heroSubtitle}
          </p>
        </div>
      </div>

      {/* Game Features Section */}
      <div className="container mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-4">
            <div className="w-12 h-px bg-[#d4af37]"></div>
            <h2 className="text-2xl font-bold text-[#d4af37]">遊戲特色</h2>
            <div className="w-12 h-px bg-[#d4af37]"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Features List */}
          <div>
            <h3 className="text-[#cc5829] text-3xl font-bold mb-2">技術懷舊服</h3>
            <h4 className="text-[#cc5829] text-2xl font-bold mb-6">Ver.113</h4>

            <div className="space-y-3 text-[#e2d2bb]">
              {gameFeatures.map((feature) => (
                <p key={feature.id}>{feature.text}</p>
              ))}
            </div>
          </div>

          {/* Game Screenshot/Video */}
          <div className="relative">
            <div className="bg-black/50 rounded-lg overflow-hidden border-2 border-[#d4af37]">
              <Image
                src="https://ext.same-assets.com/3979760254/3573235999.png"
                alt="Game Screenshot"
                width={600}
                height={400}
                className="object-cover w-full h-auto"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/70 text-white px-4 py-2 rounded">
                  只有菇菇王國解不過癮嗎
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Classes Section */}
      <div className="container mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-4">
            <div className="w-12 h-px bg-[#d4af37]"></div>
            <h2 className="text-2xl font-bold text-[#d4af37]">職業介紹</h2>
            <div className="w-12 h-px bg-[#d4af37]"></div>
          </div>
        </div>

        {/* Job Category Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button className="bg-[#cc5829] text-white px-6 py-2 rounded font-medium">
            冒險家
          </button>
          <button className="bg-white/10 text-[#d4af37] px-6 py-2 rounded font-medium hover:bg-white/20 transition-colors">
            皇家騎士團
          </button>
          <button className="bg-white/10 text-[#d4af37] px-6 py-2 rounded font-medium hover:bg-white/20 transition-colors">
            英雄
          </button>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {jobClasses.map((job) => (
            <div key={job.id} className="text-center">
              <div className="bg-gradient-to-b from-[#8b4513] to-[#654321] rounded-lg border-2 border-[#d4af37] p-4 hover:scale-105 transition-transform">
                <div className="w-16 h-16 mx-auto mb-2 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">{job.icon}</span>
                </div>
                <p className="text-[#e2d2bb] font-medium">{job.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-4">
            <div className="w-12 h-px bg-[#d4af37]"></div>
            <h2 className="text-2xl font-bold text-[#d4af37]">組隊介紹</h2>
            <div className="w-12 h-px bg-[#d4af37]"></div>
          </div>
        </div>

        {/* Team Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button className="bg-[#cc5829] text-white px-4 py-2 rounded font-medium">
            原廠組隊副本
          </button>
          <button className="bg-white/10 text-[#d4af37] px-4 py-2 rounded font-medium hover:bg-white/20 transition-colors">
            每週組隊A區
          </button>
          <button className="bg-white/10 text-[#d4af37] px-4 py-2 rounded font-medium hover:bg-white/20 transition-colors">
            每週副本B區
          </button>
          <button className="bg-white/10 text-[#d4af37] px-4 py-2 rounded font-medium hover:bg-white/20 transition-colors">
            每週副本C區
          </button>
          <button className="bg-white/10 text-[#d4af37] px-4 py-2 rounded font-medium hover:bg-white/20 transition-colors">
            每週副本D區
          </button>
        </div>

        {/* Team Instance Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: '第一次冒險', icon: '🌟' },
            { name: '時空的裂縫', icon: '⏰' },
            { name: '雷龍森林', icon: '🐲' },
            { name: '艾神的遺跡', icon: '🏛️' },
            { name: '金字塔騎士', icon: '⚔️' },
            { name: '黑密爾與卡德威爾', icon: '👥' }
          ].map((instance, index) => (
            <div key={index} className="text-center">
              <div className="bg-gradient-to-b from-[#8b4513] to-[#654321] rounded-lg border-2 border-[#d4af37] p-4 hover:scale-105 transition-transform">
                <div className="w-16 h-16 mx-auto mb-2 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">{instance.icon}</span>
                </div>
                <p className="text-[#e2d2bb] font-medium text-sm">{instance.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Moments Section */}
      <div className="container mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-4">
            <div className="w-12 h-px bg-[#d4af37]"></div>
            <h2 className="text-2xl font-bold text-[#d4af37]">歷史合影</h2>
            <div className="w-12 h-px bg-[#d4af37]"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-gradient-to-b from-[#8b4513] to-[#654321] rounded-lg border-2 border-[#d4af37] p-4">
              <div className="aspect-video bg-black/30 rounded mb-4 flex items-center justify-center">
                <span className="text-[#d4af37] text-4xl">📸</span>
              </div>
              <p className="text-[#e2d2bb] text-center">歷史回憶 {index + 1}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Access */}
      <div className="fixed bottom-4 right-4">
        <a
          href="/admin"
          className="bg-[#d4af37] hover:bg-[#ffd700] text-[#1a1612] px-4 py-2 rounded-full font-medium transition-colors shadow-lg"
        >
          後台管理
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-black/40 py-8 mt-16">
        <div className="container mx-auto px-8 text-center">
          <p className="text-[#d4af37] mb-4">{settings.footerText}</p>
          <div className="flex justify-center space-x-4">
            {settings.socialFacebook && (
              <a href={settings.socialFacebook} className="text-[#cc5829] hover:text-[#ffd700] transition-colors">
                遊戲家
              </a>
            )}
            {settings.socialDiscord && (
              <a href={settings.socialDiscord} className="text-[#d4af37] hover:text-[#ffd700] transition-colors">
                Discord
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}
