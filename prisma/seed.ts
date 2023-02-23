import { PrismaClient } from '@prisma/client'
import { encryptPassword, randomCompany, randomLocation } from '../src/common/helpers'
const prisma = new PrismaClient()
async function main() {
  const adminUser = {
    email: 'admin@admin.com',
    name: 'Admin',
    password: await encryptPassword('admin@1A')
  }

  const fakeAdminCompany = Array(30).fill(null).map(() => randomCompany())
  const fakeAdminLocation = Array(50).fill(null).map(() => randomLocation())

  const adminUserCreated = await prisma.user.upsert({
    where: { email: adminUser.email },
    update: {},
    create: {
      email: adminUser.email,
      name: adminUser.name,
      password: adminUser.password
    },
  })

  const adminCompany = fakeAdminCompany.map(async (company) => await prisma.company.create({
    data: {
      name: company.name,
      cnpj: company.cnpj,
      webSite: company.webSite,
      userId: adminUserCreated.id
    },
  }))

  fakeAdminLocation.forEach(async (location) => {
    await prisma.location.create({
      data: {
        name: location.name,
        street: location.street,
        postalCode: location.postalCode,
        number: location.number,
        district: location.district,
        city: location.city,
        state: location.state,
        companyId: (await adminCompany[Math.floor(Math.random() * 5)]).id
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