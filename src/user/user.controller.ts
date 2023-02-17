import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common'
import { User } from '@prisma/client'
import { RemovePasswordFieldInterceptor } from '../common/interceptors/password-response.interceptor'
import { RemoveUserPasswordFieldInterceptor } from '../common/interceptors/password-response.interceptor'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'

@Controller('user')
@UseInterceptors(RemoveUserPasswordFieldInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id)
  }
}
