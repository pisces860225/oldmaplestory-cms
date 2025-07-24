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

## 🛠️ 技術堆疊

- **前端框架**: Next.js 15
- **UI 庫**: Tailwind CSS + Shadcn/ui
- **資料庫**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **開發工具**: TypeScript, Biome
- **部署**: Netlify/Vercel

## 🚀 快速開始

### 1. 安裝依賴

```bash
bun install
```

### 2. 環境設定

複製 `.env.example` 為 `.env` 並設定以下變數：

```bash
# Database
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
```

### 3. 資料庫遷移

```bash
bun run db:generate
bun run db:migrate
bun run db:seed
```

### 4. 啟動開發伺服器

```bash
bun run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 查看結果。

## 📁 專案結構

```
src/
├── app/
│   ├── admin/          # 後台管理介面
│   ├── api/            # API 路由
│   └── page.tsx        # 前台首頁
├── lib/
│   └── prisma.ts       # Prisma 客戶端
└── components/         # UI 元件
```

## 🎯 API 端點

- `GET/POST /api/site-settings` - 網站設定
- `GET/POST /api/game-features` - 遊戲特色
- `GET/POST /api/job-classes` - 職業管理
- 更多 API 請參考 `src/app/api/` 目錄

## 📝 資料庫模型

主要資料模型包括：
- User (使用者)
- SiteSettings (網站設定)
- GameFeature (遊戲特色)
- JobClass (職業)
- NewsPost (新聞)
- HistoricalMoment (歷史時刻)

## 🔧 可用指令

```bash
# 開發
bun run dev

# 建置
bun run build

# 啟動生產環境
bun run start

# 程式碼檢查
bun run lint

# 格式化程式碼
bun run format

# 資料庫相關
bun run db:generate    # 生成 Prisma 客戶端
bun run db:migrate     # 執行遷移
bun run db:seed        # 填充種子資料
bun run db:reset       # 重置資料庫
```

## 📄 授權

此專案僅供學習和演示目的使用。
