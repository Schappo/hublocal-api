import { Prisma } from "@prisma/client"
import * as faker from "faker-br"
import { CheckRandomHelper } from "../types"

export const randomUser = (check?: CheckRandomHelper): Prisma.UserCreateInput => ({
  id: check?.hasId ? faker.random.uuid() : undefined,
  email: faker.internet.email(),
  name: faker.name.firstName(),
  password: faker.internet.password(),
})

export const randomCompany = (check?: CheckRandomHelper): Prisma.CompanyCreateInput => ({
  id: check?.hasId ? faker.random.uuid() : undefined,
  name: faker.company.companyName(),
  cnpj: faker.br.cnpj(),
  webSite: faker.internet.url(),
  user: check?.hasUserId ? faker.random.uuid() : undefined,
})

export const randomLocation = (check?: CheckRandomHelper): Prisma.LocationCreateInput => ({
  id: check?.hasId ? faker.random.uuid() : undefined,
  name: faker.name.firstName(),
  street: faker.address.streetName(),
  postalCode: faker.address.zipCode(),
  number: faker.random.number({ min: 10, max: 100 }).toString(),
  district: faker.address.county(),
  city: faker.address.city(),
  state: faker.address.state(),
  company: check?.hasCompanyId ? faker.random.uuid() : undefined,
})