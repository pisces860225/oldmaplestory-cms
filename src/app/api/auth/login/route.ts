import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: '請提供電子郵件和密碼' }, { status: 400 })
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json({ message: '使用者不存在' }, { status: 401 })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ message: '密碼錯誤' }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'default-secret-key',
      { expiresIn: '24h' }
    )

    return NextResponse.json({
      message: '登入成功',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: '登入過程中發生錯誤' }, { status: 500 })
  }
}
