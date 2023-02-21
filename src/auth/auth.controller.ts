import { Body, Controller, Post, UnauthorizedException, UseInterceptors } from '@nestjs/common'
import { User } from '@prisma/client'
import { RemoveUserPasswordFieldInterceptor } from '../common/interceptors/password-response.interceptor'
import { Login } from '../common/types'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { UserService } from '../user/user.service'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  @Post('login')
  async login(@Body() login: Login): Promise<{ access_token: string }> {
    try {
      return await this.authService.login(login)
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials')
    }
  }

  @Post('sign-in')
  @UseInterceptors(RemoveUserPasswordFieldInterceptor)
  async signIn(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.create(user)
  }
}