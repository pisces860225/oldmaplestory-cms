import { prisma } from "./src/lib/prisma"
import bcrypt from "bcryptjs"

async function createAdminUser() {
  try {
    // 检查是否已存在管理员用户
    const existingUser = await prisma.user.findUnique({
      where: { email: "admin@oldmaplestory.tw" }
    })

    if (existingUser) {
      console.log("管理员用户已存在")
      return
    }

    // 创建管理员用户
    const hashedPassword = await bcrypt.hash("admin123", 10)
    
    const user = await prisma.user.create({
      data: {
        email: "admin@oldmaplestory.tw",
        username: "admin",
        password: hashedPassword,
        role: "admin"
      }
    })

    console.log("管理员用户创建成功:")
    console.log("邮箱: admin@oldmaplestory.tw")
    console.log("密码: admin123")
    console.log("用户ID:", user.id)
  } catch (error) {
    console.error("创建管理员用户失败:", error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminUser()
