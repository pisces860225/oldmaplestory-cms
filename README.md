# 楓之谷懷舊伺服器網站 CMS 系統

使用 Next.js + Prisma + Supabase 建構的完整內容管理系統，專為楓之谷遊戲伺服器設計。

## ✨ 功能特色

- 🎮 完整的遊戲內容管理
- 📰 新聞系統
- 👥 職業管理
- 🏆 團隊實例管理
- 📸 遊戲截圖管理
- 🎯 遊戲特色管理
- 📈 歷史時刻記錄
- 🎨 網站設定管理
- 📱 響應式設計
- 🔐 管理員後台系統
- 🌐 SEO 友善設計

## 🛠️ 技術堆疊

- **前端框架**: Next.js 15 (App Router)
- **UI 庫**: Tailwind CSS + Shadcn/ui
- **資料庫**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **認證**: NextAuth.js
- **開發工具**: TypeScript, Biome, ESLint
- **運行時**: Bun
- **部署**: Netlify/Vercel

## 🚀 快速開始

### 1. 克隆專案

```bash
git clone <repository-url>
cd oldmaplestory-clone
```

### 2. 安裝依賴

```bash
bun install
```

### 3. Supabase 設置

#### 3.1 建立 Supabase 專案
1. 前往 [Supabase](https://supabase.com/) 並建立新專案
2. 記下專案 ID（例如：ujwtjqmnjpiayrzchnak）
3. 獲取資料庫密碼和 API 金鑰

#### 3.2 環境變數設定

複製 `.env.example` 為 `.env` 並更新以下變數：

```bash
# Database - 將 [YOUR-PASSWORD] 替換為您的 Supabase 資料庫密碼
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.ujwtjqmnjpiayrzchnak.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.ujwtjqmnjpiayrzchnak.supabase.co:5432/postgres"

# Supabase - 將 [YOUR-ANON-KEY] 替換為您的匿名金鑰
NEXT_PUBLIC_SUPABASE_URL="https://ujwtjqmnjpiayrzchnak.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"

# NextJS
JWT_SECRET="your-super-secret-jwt-key-here"
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

#### 3.3 獲取 Supabase 憑證

1. **專案 URL**: 在 Supabase 儀表板 → Settings → API → Project URL
2. **Anon Key**: 在 Supabase 儀表板 → Settings → API → Project API keys → anon public
3. **資料庫密碼**: 在 Supabase 儀表板 → Settings → Database → Connection info

### 4. 資料庫設置

```bash
# 生成 Prisma 客戶端
bun run db:generate

# 執行資料庫遷移
bun run db:migrate

# 填充初始資料
bun run db:seed
```

### 5. 啟動開發伺服器

```bash
bun run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 查看網站前台。

## 🔐 管理員登入

種子資料會建立一個預設管理員帳號：

- **登入頁面**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **帳號**: admin@oldmaplestory.tw
- **密碼**: admin123
- **使用者名稱**: admin

⚠️ **安全提醒**: 請在生產環境中立即更改預設密碼！

## 📁 專案結構

```
src/
├── app/
│   ├── admin/              # 後台管理介面
│   │   ├── login/          # 登入頁面
│   │   ├── dashboard/      # 管理儀表板
│   │   ├── site-settings/  # 網站設定管理
│   │   ├── game-features/  # 遊戲特色管理
│   │   ├── job-classes/    # 職業管理
│   │   ├── team-instances/ # 團隊實例管理
│   │   ├── screenshots/    # 截圖管理
│   │   ├── history/        # 歷史時刻管理
│   │   └── news/           # 新聞管理
│   ├── api/                # API 路由
│   │   ├── auth/           # 認證相關 API
│   │   ├── site-settings/  # 網站設定 API
│   │   ├── game-features/  # 遊戲特色 API
│   │   └── ...             # 其他 API 端點
│   ├── globals.css         # 全域樣式
│   ├── layout.tsx          # 根佈局
│   └── page.tsx            # 前台首頁
├── lib/
│   ├── prisma.ts           # Prisma 客戶端
│   ├── auth.ts             # NextAuth 配置
│   └── utils.ts            # 工具函數
└── components/             # UI 元件
    ├── ui/                 # Shadcn/ui 元件
    ├── admin/              # 管理後台元件
    └── frontend/           # 前台元件
```

## 🎯 API 端點

### 認證相關
- `POST /api/auth/login` - 管理員登入
- `POST /api/auth/logout` - 登出

### 內容管理
- `GET/POST /api/site-settings` - 網站設定
- `GET/POST /api/game-features` - 遊戲特色
- `GET/POST /api/job-classes` - 職業管理
- `GET/POST /api/team-instances` - 團隊實例
- `GET/POST /api/screenshots` - 遊戲截圖
- `GET/POST /api/history` - 歷史時刻
- `GET/POST /api/news` - 新聞系統

### 媒體管理
- `POST /api/media/upload` - 檔案上傳
- `GET /api/media` - 媒體資料庫

## 📝 資料庫模型

主要資料模型包括：

- **User** - 使用者管理（管理員帳號）
- **SiteSettings** - 網站基本設定（標題、Logo、背景等）
- **NavigationItem** - 導航選單管理
- **GameFeature** - 遊戲特色列表
- **JobClass** - 職業資訊
- **JobCategory** - 職業分類
- **TeamInstance** - 團隊副本資訊
- **TeamCategory** - 團隊分類
- **GameScreenshot** - 遊戲截圖
- **HistoricalMoment** - 歷史重要時刻
- **NewsPost** - 新聞文章
- **MediaAsset** - 媒體檔案管理

## 🔧 可用指令

```bash
# 開發相關
bun run dev              # 啟動開發伺服器
bun run build            # 建置生產版本
bun run start            # 啟動生產伺服器
bun run lint             # 程式碼檢查
bun run format           # 格式化程式碼

# 資料庫相關
bun run db:generate      # 生成 Prisma 客戶端
bun run db:migrate       # 執行資料庫遷移
bun run db:seed          # 填充種子資料
bun run db:reset         # 重置資料庫並重新填充資料
```

## 🚀 部署指南

### Netlify 部署

1. 連接 GitHub repository 到 Netlify
2. 設定建置指令：`bun run build`
3. 設定發布目錄：`.next`
4. 設定環境變數（參考 .env.example）
5. 部署完成後更新 `NEXTAUTH_URL` 為實際域名

### Vercel 部署

1. 匯入 GitHub repository 到 Vercel
2. Vercel 會自動偵測 Next.js 專案
3. 設定環境變數
4. 部署完成

### 環境變數設定

在部署平台設定以下環境變數：

```bash
DATABASE_URL=postgresql://postgres:password@db.project.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:password@db.project.supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
JWT_SECRET=your-production-jwt-secret
NEXTAUTH_SECRET=your-production-nextauth-secret
NEXTAUTH_URL=https://your-domain.com
```

## 🔒 安全性考量

- ✅ 環境變數不會暴露在客戶端
- ✅ 管理員認證使用 bcrypt 加密
- ✅ API 端點有適當的權限檢查
- ✅ Prisma 防止 SQL 注入攻擊
- ⚠️ 請在生產環境更改預設管理員密碼
- ⚠️ 設定強隨機的 JWT 和 NextAuth 密鑰

## 🛠️ 疑難排解

### 資料庫連線問題

1. 確認 Supabase 專案 ID 正確
2. 檢查資料庫密碼是否正確
3. 確認 IP 位址在 Supabase 允許清單中

### Prisma 相關問題

```bash
# 重新生成客戶端
bun run db:generate

# 檢查遷移狀態
bunx prisma migrate status

# 重置資料庫
bun run db:reset
```

### 建置錯誤

```bash
# 清除快取
rm -rf .next node_modules
bun install
bun run build
```

## 🤝 貢獻指南

1. Fork 專案
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交變更 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

## 📄 授權

此專案僅供學習和演示目的使用。

## 📞 支援

如有問題，請開啟 GitHub Issue 或聯繫專案維護者。

---

**🎮 舊楓之谷，永遠的經典！**
