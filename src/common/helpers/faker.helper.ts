import { faker } from "@faker-js/faker"
import { Prisma } from "@prisma/client"

export const randomUser = (): Prisma.UserCreateInput => ({
  email: faker.internet.email(),
  name: faker.name.fullName(),
  password: faker.internet.password(),
})