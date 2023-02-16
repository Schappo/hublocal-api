import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { encryptPassword } from '../helpers/encrypt.helper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(user: Prisma.UserCreateInput): Promise<User> {
    const encryptedPassword = await encryptPassword(user.password)
    user.password = encryptedPassword
    return this.prisma.user.create({ data: user })
  }
}
