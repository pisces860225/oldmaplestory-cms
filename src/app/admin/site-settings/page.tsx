'use client'

import { useEffect, useState } from 'react'

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
  backgroundImage?: string
}

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/site-settings')
      const data = await response.json()
      setSettings(data)
    } catch (error) {
      console.error('Error fetching settings:', error)
      setMessage('載入設定失敗')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!settings) return

    setIsSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        setMessage('設定已成功更新！')
        setTimeout(() => setMessage(''), 3000)
      } else {
        throw new Error('更新失敗')
      }
    } catch (error) {
      console.error('Error updating settings:', error)
      setMessage('更新設定失敗，請稍後再試')
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (field: keyof SiteSettings, value: string) => {
    if (!settings) return
    setSettings({ ...settings, [field]: value })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#d4af37]">載入中...</div>
      </div>
    )
  }

  if (!settings) {
    return (
      <div className="text-center text-red-500">
        無法載入設定，請重新整理頁面
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#d4af37] mb-2">網站設定</h1>
        <p className="text-[#e2d2bb]">管理網站基本設定和配置</p>
      </div>

      {message && (
        <div className={`p-4 rounded ${
          message.includes('成功')
            ? 'bg-green-500/20 border border-green-500 text-green-400'
            : 'bg-red-500/20 border border-red-500 text-red-400'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 基本設定 */}
        <div className="admin-card p-6">
          <h2 className="text-xl font-bold text-[#d4af37] mb-6">基本設定</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#d4af37] text-sm font-medium mb-2">
                網站標題
              </label>
              <input
                type="text"
                value={settings.siteTitle}
                onChange={(e) => handleChange('siteTitle', e.target.value)}
                className="admin-input w-full"
                placeholder="舊楓之谷Ver113"
              />
            </div>
            <div>
              <label className="block text-[#d4af37] text-sm font-medium mb-2">
                網站 Logo URL
              </label>
              <input
                type="url"
                value={settings.siteLogo}
                onChange={(e) => handleChange('siteLogo', e.target.value)}
                className="admin-input w-full"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        {/* 首頁設定 */}
        <div className="admin-card p-6">
          <h2 className="text-xl font-bold text-[#d4af37] mb-6">首頁設定</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-[#d4af37] text-sm font-medium mb-2">
                主標題
              </label>
              <input
                type="text"
                value={settings.heroTitle}
                onChange={(e) => handleChange('heroTitle', e.target.value)}
                className="admin-input w-full"
                placeholder="舊楓之谷"
              />
            </div>
            <div>
              <label className="block text-[#d4af37] text-sm font-medium mb-2">
                副標題
              </label>
              <input
                type="text"
                value={settings.heroSubtitle}
                onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                className="admin-input w-full"
                placeholder="皇家騎士團全數重製　　引燃技術懷舊新章節"
              />
            </div>
            <div>
              <label className="block text-[#d4af37] text-sm font-medium mb-2">
                主要 Logo URL
              </label>
              <input
                type="url"
                value={settings.heroLogo}
                onChange={(e) => handleChange('heroLogo', e.target.value)}
                className="admin-input w-full"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-[#d4af37] text-sm font-medium mb-2">
                背景圖片 URL
              </label>
              <input
                type="url"
                value={settings.backgroundImage || ''}
                onChange={(e) => handleChange('backgroundImage', e.target.value)}
                className="admin-input w-full"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        {/* 下載按鈕設定 */}
        <div className="admin-card p-6">
          <h2 className="text-xl font-bold text-[#d4af37] mb-6">下載按鈕設定</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#d4af37] text-sm font-medium mb-2">
                按鈕文字
              </label>
              <input
                type="text"
                value={settings.downloadButtonText}
                onChange={(e) => handleChange('downloadButtonText', e.target.value)}
                className="admin-input w-full"
                placeholder="遊戲下載"
              />
            </div>
            <div>
              <label className="block text-[#d4af37] text-sm font-medium mb-2">
                下載連結
              </label>
              <input
                type="url"
                value={settings.downloadButtonUrl}
                onChange={(e) => handleChange('downloadButtonUrl', e.target.value)}
                className="admin-input w-full"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        {/* 社交媒體設定 */}
        <div className="admin-card p-6">
          <h2 className="text-xl font-bold text-[#d4af37] mb-6">社交媒體連結</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[#d4af37] text-sm font-medium mb-2">
                Discord 連結
              </label>
              <input
                type="url"
                value={settings.socialDiscord || ''}
                onChange={(e) => handleChange('socialDiscord', e.target.value)}
                className="admin-input w-full"
                placeholder="https://discord.gg/..."
              />
            </div>
            <div>
              <label className="block text-[#d4af37] text-sm font-medium mb-2">
                Facebook 連結
              </label>
              <input
                type="url"
                value={settings.socialFacebook || ''}
                onChange={(e) => handleChange('socialFacebook', e.target.value)}
                className="admin-input w-full"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className="block text-[#d4af37] text-sm font-medium mb-2">
                Twitter 連結
              </label>
              <input
                type="url"
                value={settings.socialTwitter || ''}
                onChange={(e) => handleChange('socialTwitter', e.target.value)}
                className="admin-input w-full"
                placeholder="https://twitter.com/..."
              />
            </div>
          </div>
        </div>

        {/* 頁腳設定 */}
        <div className="admin-card p-6">
          <h2 className="text-xl font-bold text-[#d4af37] mb-6">頁腳設定</h2>
          <div>
            <label className="block text-[#d4af37] text-sm font-medium mb-2">
              頁腳文字
            </label>
            <input
              type="text"
              value={settings.footerText}
              onChange={(e) => handleChange('footerText', e.target.value)}
              className="admin-input w-full"
              placeholder="© 2025 OldMapleStory"
            />
          </div>
        </div>

        {/* 儲存按鈕 */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="admin-button px-8 py-3 rounded disabled:opacity-50"
          >
            {isSaving ? '儲存中...' : '儲存設定'}
          </button>
        </div>
      </form>
    </div>
  )
}
