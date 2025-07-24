'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">管理員登入</h1>
            <p className="text-gray-300">楓之谷後台管理系統</p>
          </div>
          
          <form className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">電子郵件</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin@oldmaplestory.tw"
                required
              />
            </div>
            
            <div>
              <label className="block text-white text-sm font-medium mb-2">密碼</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="請輸入密碼"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              登入後台
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <a href="/" className="text-blue-400 hover:text-blue-300 text-sm">← 返回網站首頁</a>
          </div>
        </div>
      </div>
    </div>
  )
}
