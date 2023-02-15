import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from './prisma.service'

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }
  getHello(): string {
    return 'Hello World!'
  }

  async createUser(data: Prisma.UserCreateInput): Promise<void> {
    await this.prisma.user.create({ data })
  }
}