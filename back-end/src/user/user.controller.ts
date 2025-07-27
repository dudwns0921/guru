import { Controller, Get, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.entity'

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

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.userService.remove(+id)
  }
}
