import { PrismaClient } from '@prisma/client'
import { randomCompany, randomLocation, randomUser } from '../src/common/helpers'
const prisma = new PrismaClient()
async function main() {
  const fakeUsers = [randomUser(true), randomUser(true)]
  const fakeCompany = [randomCompany(true), randomCompany(true)]
  const fakeLocation = [randomLocation(true), randomLocation(true)]

  const usersCreated = fakeUsers.map(async user => {
    return await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        name: user.name,
        password: user.password
      },
    })
  })

  const companiesCreated = fakeCompany.map(async (company, index) => {
    return await prisma.company.create({
      data: {
        name: company.name,
        cnpj: company.cnpj,
        webSite: company.webSite,
        userId: (await usersCreated[index]).id
      },
    })
  })

  fakeLocation.forEach(async (location, index) => {
    await prisma.location.create({
      data: {
        name: location.name,
        street: location.street,
        postalCode: location.postalCode,
        number: location.number,
        district: location.district,
        city: location.city,
        state: location.state,
        companyId: (await companiesCreated[index]).id
      },
    })
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })