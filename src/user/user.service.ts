import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { BaseCrudService } from '../common/base-crud.service'
import { encryptPassword } from '../common/helpers/encrypt.helper'
import { CreateUserDto } from './dto/create-user.dto'

import { PrismaService } from '../prisma.service'

@Injectable()
export class UserService extends BaseCrudService<User> {

  constructor(
    protected readonly prisma: PrismaService
  ) {
    super(prisma, 'user')
  }

  async create(user: CreateUserDto): Promise<User> {
    const encryptedPassword = await encryptPassword(user.password)
    user.password = encryptedPassword
    return await this.prisma.user.create({ data: user })
  }

}
