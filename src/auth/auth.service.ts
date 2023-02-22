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
    if (!user) {
      throw new Error('User not found')
    }
    if (await comparePassword(pass, user.password)) {
      const { password, ...result } = user
      return result
    } else {
      throw new Error('Invalid credentials')
    }
  }

  async login(user: Partial<User>) {
    const validatedUser = await this.validateUser(user.email, user.password)

    return {
      accessToken: this.jwtService.sign({
        id: validatedUser.id,
        name: validatedUser.name,
        email: validatedUser.email,
      }),
      user: validatedUser,
    }
  }
}