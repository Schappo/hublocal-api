import { Body, Controller, Post } from '@nestjs/common'
import { User } from '@prisma/client'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user)
  }
}
