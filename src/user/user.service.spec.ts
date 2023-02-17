import { faker } from '@faker-js/faker'
import { Test, TestingModule } from '@nestjs/testing'
import { Prisma } from '@prisma/client'
import { comparePassword } from '../common/helpers/encrypt.helper'
import { randomUser } from '../common/helpers/faker.helper'
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

  describe('find user', () => {
    it('should find a user by id', async () => {
      const expectedUser = { ...randomUser(), id: faker.datatype.uuid() }

      jest.spyOn(prismaService.user, 'findUniqueOrThrow').mockResolvedValue(expectedUser)

      expect(await service.findById(expectedUser.id)).toEqual(expectedUser)
      expect(prismaService.user.findUniqueOrThrow).toHaveBeenCalledWith({ where: { id: expectedUser.id } })
    })

    it('should find all user', async () => {
      const expectedUser = () => ({ ...randomUser(), id: faker.datatype.uuid() })
      const expectedUsers = [expectedUser(), expectedUser()]
      jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(expectedUsers)

      expect(await service.findAll()).toEqual(expectedUsers)
      expect(prismaService.user.findMany).toHaveBeenCalled()
    })

  })

})
