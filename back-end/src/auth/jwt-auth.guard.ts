import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import * as jwt from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>()
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided')
    }

    const token = authHeader.replace('Bearer ', '')
    try {
      const secret = this.configService.get<string>('JWT_SECRET') || 'mysecretkey'
      const payload = jwt.verify(token, secret) as { id: number }
      req.user = payload
      return true
    } catch {
      throw new UnauthorizedException('Invalid token')
    }
  }
}
