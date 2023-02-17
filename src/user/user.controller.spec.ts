import { faker } from '@faker-js/faker'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { randomUser } from '../common/helpers/faker.helper'
import { PrismaService } from '../prisma.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'


describe('UserController', () => {
  let userService: UserService
  let app: INestApplication

  const fakeUserInput = randomUser()
  const user = {
    ...fakeUserInput,
    id: faker.datatype.uuid()
  }
  const { ['password']: remove, ...fakeUserWithoutPassword } = user


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile()

    app = module.createNestApplication()
    app.init()
    userService = module.get<UserService>(UserService)

    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(userService).toBeDefined()
  })

  describe('Return User Without password', () => {
    it('should create a user and return a user without password', async () => {

      jest.spyOn(userService, 'create').mockResolvedValue(user)

      const res = await request(app.getHttpServer())
        .post('/user')
        .send(fakeUserInput)
        .expect(201)

      expect(res.body).toEqual(fakeUserWithoutPassword)
    })

    it('should find a user by id and return a user without password', async () => {
      jest.spyOn(userService, 'findById').mockResolvedValue(user)

      const res = await request(app.getHttpServer())
        .get(`/user/${fakeUserInput.id}`)
        .expect(200)

      expect(res.body).toEqual(fakeUserWithoutPassword)
    })

    it('should find all users and return all users without password', async () => {
      jest.spyOn(userService, 'findAll').mockResolvedValue([user])

      const res = await request(app.getHttpServer())
        .get(`/user`)
        .expect(200)

      expect(res.body).toEqual([fakeUserWithoutPassword])
    })

    it('should update a user and return updated user without password', async () => {
      const updatedName = faker.name.fullName()

      jest.spyOn(userService, 'update').mockResolvedValue({ ...user, name: updatedName })

      const res = await request(app.getHttpServer())
        .put(`/user/${fakeUserInput.id}`)
        .send({ ...fakeUserInput, name: updatedName })
        .expect(200)

      expect(res.body).toEqual({ ...fakeUserWithoutPassword, name: updatedName })
    })
  })
})
