import { PrismaClient } from '@prisma/client'
import { randomUser } from '../src/common/helpers'
const prisma = new PrismaClient()
async function main() {
  const fakeUsers = [randomUser(), randomUser()]

  fakeUsers.forEach(async user => {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        name: user.name,
        password: user.password
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