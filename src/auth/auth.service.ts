import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { comparePassword } from '../common/helpers'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private readonly jwtService: JwtService) { }

  async validateUser(email: string, pass: string): Promise<Omit<User, 'password'> | null> {
    const [user] = await this.userService.find({ email })
    if (user && comparePassword(user.password, pass)) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: Partial<User>) {
    const validatedUser = await this.validateUser(user.email, user.password)
    if (!validatedUser) {
      throw new Error('Invalid credentials')
    }
    return {
      access_token: this.jwtService.sign({
        id: validatedUser.id,
        name: validatedUser.name,
        email: validatedUser.email,
      }),
    }
  }
}