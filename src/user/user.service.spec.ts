import { faker } from '@faker-js/faker'
import { Test, TestingModule } from '@nestjs/testing'
import { Prisma } from '@prisma/client'
import { comparePassword } from '../helpers/encrypt.helper'
import { randomUser } from '../helpers/faker.helper'
import { PrismaService } from '../prisma.service'
import { UserService } from './user.service'

describe('UserService', () => {
  let service: UserService
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile()

    service = module.get<UserService>(UserService)
    prismaService = module.get<PrismaService>(PrismaService)

    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create user', () => {
    it('should create a user', async () => {
      const user: Prisma.UserCreateInput = randomUser()
      const expectedUser = {
        id: faker.datatype.uuid(),
        ...user,
      }
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(expectedUser)
      expect(service.create(user)).resolves.toEqual(expectedUser)
    })

    it('should encrypt the user password', async () => {
      const user = randomUser()
      const expectedUser = {
        id: faker.datatype.uuid(),
        ...user,
      }

      jest.spyOn(prismaService.user, 'create').mockResolvedValue(expectedUser)
      const createdUser = await service.create(user)

      expect(createdUser.password).not.toBe(user.password)
      const validatePassword = await comparePassword(createdUser.password, user.password)
      expect(validatePassword).toBe(true)
    })
  })

})
