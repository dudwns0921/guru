import { Controller, Get, Param, Delete, UseGuards, Req } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.entity'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return await this.userService.findOne(+id)
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<User | null> {
    return await this.userService.findByEmail(email)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  async removeMe(@Req() req: import('express').Request) {
    const userId = (req.user as { sub: number }).sub
    return await this.userService.removeMe(userId)
  }
}
