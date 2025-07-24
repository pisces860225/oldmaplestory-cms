import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'maple-story-cms-super-secret-key-2025'
const JWT_EXPIRES_IN = '7d'

export interface AuthUser {
  id: string
  email: string
  username: string
  role: string
}

export interface LoginCredentials {
  email: string
  password: string
}

// 生成JWT token
export function generateToken(user: AuthUser): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )
}

// 验证JWT token
export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser
    return decoded
  } catch (error) {
    console.error('Token验证失败:', error)
    return null
  }
}

// 用户登录
export async function loginUser(credentials: LoginCredentials): Promise<{ user: AuthUser; token: string } | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: credentials.email }
    })

    if (!user) {
      return null
    }

    const isValidPassword = await bcrypt.compare(credentials.password, user.password)
    if (!isValidPassword) {
      return null
    }

    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    }

    const token = generateToken(authUser)

    return { user: authUser, token }
  } catch (error) {
    console.error('登录失败:', error)
    return null
  }
}

// 创建用户
export async function createUser(userData: { email: string; username: string; password: string; role?: string }): Promise<AuthUser | null> {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10)

    const user = await prisma.user.create({
      data: {
        email: userData.email,
        username: userData.username,
        password: hashedPassword,
        role: userData.role || 'admin'
      }
    })

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    }
  } catch (error) {
    console.error('创建用户失败:', error)
    return null
  }
}

// 验证管理员权限
export function isAdmin(user: AuthUser | null): boolean {
  return user?.role === 'admin'
}

// 从请求头获取token
export function getTokenFromHeaders(authorization: string | null): string | null {
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null
  }
  return authorization.substring(7)
}
