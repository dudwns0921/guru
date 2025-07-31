import { Controller, Delete, UseGuards, Req } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  async removeMe(@Req() req: import('express').Request) {
    const userId = (req.user as { sub: number }).sub
    return await this.userService.removeMe(userId)
  }
}
