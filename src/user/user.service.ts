import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from '../prisma.service'

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    })
  }
}
