import { Prisma } from "@prisma/client"
import * as faker from "faker-br"

export const randomUser = (id?: boolean): Prisma.UserCreateInput => ({
  id: id ? faker.random.uuid() : undefined,
  email: faker.internet.email(),
  name: faker.name.firstName(),
  password: faker.internet.password(),
})

export const randomCompany = (id?: boolean): Prisma.CompanyCreateInput => ({
  id: id ? faker.random.uuid() : undefined,
  name: faker.company.companyName(),
  cnpj: faker.br.cnpj(),
  webSite: faker.internet.url(),
})

export const randomLocation = (id?: boolean): Prisma.LocationCreateInput => ({
  id: id ? faker.random.uuid() : undefined,
  name: faker.name.firstName(),
  street: faker.address.streetName(),
  postalCode: faker.address.zipCode(),
  number: faker.random.number({ min: 10, max: 100 }).toString(),
  district: faker.address.county(),
  city: faker.address.city(),
  state: faker.address.state(),
})