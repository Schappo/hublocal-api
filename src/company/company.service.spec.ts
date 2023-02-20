import { Test, TestingModule } from '@nestjs/testing'
import { Company, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { randomCompany } from '../common/helpers'
import { PrismaService } from '../prisma.service'
import { CompanyService } from './company.service'

describe('CompanyService', () => {
  let service: CompanyService
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyService, PrismaService],
    }).compile()

    service = module.get<CompanyService>(CompanyService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a Company', async () => {
    const company: Prisma.CompanyCreateInput = randomCompany({ hasCompanyId: true })

    const expectedCompany = {
      id: randomUUID(),
      ...company
    }

    jest.spyOn(prisma.company, 'create').mockResolvedValue(expectedCompany as Company)
    expect(service.create(company)).resolves.toEqual(expectedCompany)
    expect(prisma.company.create).toHaveBeenCalledWith({ data: company })
  })
})
