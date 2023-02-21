import { Body, Controller, Delete, Get, Param, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { User } from '@prisma/client'
import { RemoveUserPasswordFieldInterceptor } from '../common/interceptors/password-response.interceptor'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@Controller('user')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(RemoveUserPasswordFieldInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }


  @Get()
  async find(@Query() query: Partial<User>): Promise<User[]> {
    return await this.userService.find(query)
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return await this.userService.findById(id)
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
