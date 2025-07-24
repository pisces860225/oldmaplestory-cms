import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, AuthUser } from './auth'

export interface AuthenticatedRequest extends NextRequest {
  user?: AuthUser
}

export function withAuth(
  handler: (request: AuthenticatedRequest) => Promise<NextResponse>
) {
  return async (request: AuthenticatedRequest) => {
    try {
      const authorization = request.headers.get('authorization')

      if (!authorization || !authorization.startsWith('Bearer ')) {
        return NextResponse.json(
          { message: '需要認證' },
          { status: 401 }
        )
      }

      const token = authorization.substring(7)
      const user = verifyToken(token)

      if (!user) {
        return NextResponse.json(
          { message: '認證失敗' },
          { status: 401 }
        )
      }

      request.user = user
      return await handler(request)
    } catch (error) {
      console.error('Auth middleware error:', error)
      return NextResponse.json(
        { message: '認證錯誤' },
        { status: 500 }
      )
    }
  }
}

export function withAdminAuth(
  handler: (request: AuthenticatedRequest) => Promise<NextResponse>
) {
  return withAuth(async (request: AuthenticatedRequest) => {
    if (request.user?.role !== 'admin') {
      return NextResponse.json(
        { message: '需要管理員權限' },
        { status: 403 }
      )
    }

    return await handler(request)
  })
}

export function checkAuth(request: NextRequest): AuthUser | null {
  try {
    const authorization = request.headers.get('authorization')

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return null
    }

    const token = authorization.substring(7)
    return verifyToken(token)
  } catch (error) {
    console.error('Check auth error:', error)
    return null
  }
}
