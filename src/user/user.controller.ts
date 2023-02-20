import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common'
import { User } from '@prisma/client'
import { RemoveUserPasswordFieldInterceptor } from '../common/interceptors/password-response.interceptor'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@Controller('user')
@UseInterceptors(RemoveUserPasswordFieldInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }


  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll()
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return await this.userService.findById(id)
  }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<User> {
    return await this.userService.create(data)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
    return await this.userService.update(id, data)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return await this.userService.delete(id)
  }
}
