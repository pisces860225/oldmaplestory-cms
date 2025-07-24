import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 開始填入種子資料...')

  // 建立管理員用戶
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@oldmaplestory.tw' },
    update: {},
    create: {
      email: 'admin@oldmaplestory.tw',
      username: 'admin',
      password: hashedPassword,
      role: 'admin'
    }
  })
  console.log('✅ 管理員用戶已建立:', admin.username)

  // 網站設定
  const siteSettings = await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteLogo: 'https://ext.same-assets.com/3979760254/2136617212.png',
      siteTitle: '舊楓之谷Ver113',
      heroTitle: '舊楓之谷',
      heroSubtitle: '皇家騎士團全數重製　　引燃技術懷舊新章節',
      heroLogo: 'https://ext.same-assets.com/3979760254/1456365503.png',
      downloadButtonText: '遊戲下載',
      downloadButtonUrl: '#',
      footerText: '© 2025 OldMapleStory',
      socialDiscord: '#',
      socialFacebook: '#',
      backgroundImage: 'https://cdn2.unrealengine.com/feature-ageofdarkness-interview-1920x1080-436e770dc4a7.jpg?resize=1&w=1920'
    }
  })
  console.log('✅ 網站設定已建立')

  // 導航項目
  const navItems = [
    { label: '首頁', href: '/', order: 1 },
    { label: '遊戲內容', href: '#', order: 2 },
    { label: '更多', href: '#', order: 3 }
  ]

  for (const item of navItems) {
    await prisma.navigationItem.upsert({
      where: { id: `nav-${item.order}` },
      update: {},
      create: {
        id: `nav-${item.order}`,
        ...item
      }
    })
  }
  console.log('✅ 導航項目已建立')

  // 遊戲特色
  const gameFeatures = [
    '皇家騎士團大更動 ➛ 含母書任務全自製',
    '副本22個每週輪換 ➛ 玩膩了馬上再新增',
    '獨家進擊巨人副本 ➛ 立體機動裝置呈現',
    '製作接近百個任務 ➛ 不再只有菇菇王國',
    '精緻便利蒐藏系統 ➛ 近千個道具可收集',
    '全點裝自定義染色 ➛ 自己的風格自己造',
    '頭髮臉型雙色混染 ➛ 染別服沒有的色彩',
    '卷軸掉落全數打散 ➛ 所有怪物均會掉落',
    '每日舉辦趣味活動 ➛ 假日加開大型活動'
  ]

  for (let i = 0; i < gameFeatures.length; i++) {
    await prisma.gameFeature.upsert({
      where: { id: `feature-${i + 1}` },
      update: {},
      create: {
        id: `feature-${i + 1}`,
        text: gameFeatures[i],
        order: i + 1
      }
    })
  }
  console.log('✅ 遊戲特色已建立')

  // 遊戲截圖
  await prisma.gameScreenshot.upsert({
    where: { id: 'main-screenshot' },
    update: {},
    create: {
      id: 'main-screenshot',
      image: 'https://ext.same-assets.com/3979760254/3573235999.png',
      overlayText: '只有菇菇王國解不過癮嗎'
    }
  })
  console.log('✅ 遊戲截圖已建立')

  // 職業分類
  const jobCategories = [
    { name: '冒險家', order: 1 },
    { name: '皇家騎士團', order: 2 },
    { name: '英雄', order: 3 }
  ]

  for (const category of jobCategories) {
    await prisma.jobCategory.upsert({
      where: { id: `job-cat-${category.order}` },
      update: {},
      create: {
        id: `job-cat-${category.order}`,
        ...category
      }
    })
  }
  console.log('✅ 職業分類已建立')

  // 職業
  const jobClasses = [
    { name: '英雄', icon: '⚔️', description: '近戰戰士', category: 'adventurer', order: 1 },
    { name: '聖騎士', icon: '🛡️', description: '防禦戰士', category: 'adventurer', order: 2 },
    { name: '黑騎士', icon: '⚔️', description: '暗黑戰士', category: 'adventurer', order: 3 },
    { name: '火毒', icon: '🔥', description: '火毒法師', category: 'adventurer', order: 4 },
    { name: '冰雷', icon: '❄️', description: '冰雷法師', category: 'adventurer', order: 5 },
    { name: '主教', icon: '⭐', description: '神聖法師', category: 'adventurer', order: 6 }
  ]

  for (const job of jobClasses) {
    await prisma.jobClass.upsert({
      where: { id: `job-${job.order}` },
      update: {},
      create: {
        id: `job-${job.order}`,
        ...job
      }
    })
  }
  console.log('✅ 職業已建立')

  // 組隊分類
  const teamCategories = [
    { name: '原廠組隊副本', order: 1 },
    { name: '每週組隊A區', order: 2 },
    { name: '每週副本B區', order: 3 },
    { name: '每週副本C區', order: 4 },
    { name: '每週副本D區', order: 5 }
  ]

  for (const category of teamCategories) {
    await prisma.teamCategory.upsert({
      where: { id: `team-cat-${category.order}` },
      update: {},
      create: {
        id: `team-cat-${category.order}`,
        ...category
      }
    })
  }
  console.log('✅ 組隊分類已建立')

  // 組隊副本
  const teamInstances = [
    { name: '第一次冒險', icon: '🌟', description: '新手副本', category: '原廠組隊副本', order: 1 },
    { name: '時空的裂縫', icon: '⏰', description: '時空副本', category: '原廠組隊副本', order: 2 },
    { name: '雷龍森林', icon: '🐲', description: '龍族副本', category: '原廠組隊副本', order: 3 },
    { name: '艾神的遺跡', icon: '🏛️', description: '古代遺跡', category: '原廠組隊副本', order: 4 },
    { name: '金字塔騎士', icon: '⚔️', description: '騎士副本', category: '原廠組隊副本', order: 5 },
    { name: '黑密爾與卡德威爾', icon: '👥', description: '雙人副本', category: '原廠組隊副本', order: 6 }
  ]

  for (const instance of teamInstances) {
    await prisma.teamInstance.upsert({
      where: { id: `team-${instance.order}` },
      update: {},
      create: {
        id: `team-${instance.order}`,
        ...instance
      }
    })
  }
  console.log('✅ 組隊副本已建立')

  // 歷史合影
  const historicalMoments = [
    { title: '歷史回憶 1', image: '', description: '珍貴的遊戲回憶', order: 1 },
    { title: '歷史回憶 2', image: '', description: '難忘的團隊時光', order: 2 },
    { title: '歷史回憶 3', image: '', description: '經典的遊戲瞬間', order: 3 }
  ]

  for (const moment of historicalMoments) {
    await prisma.historicalMoment.upsert({
      where: { id: `moment-${moment.order}` },
      update: {},
      create: {
        id: `moment-${moment.order}`,
        ...moment
      }
    })
  }
  console.log('✅ 歷史合影已建立')

  console.log('🎉 種子資料填入完成！')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
