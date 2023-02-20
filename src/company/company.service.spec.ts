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

  it('should find a Company by id', async () => {
    const expectedCompany = { ...randomCompany(), id: randomUUID() }

    jest.spyOn(prisma.company, 'findUniqueOrThrow').mockResolvedValue(expectedCompany as Company)
    expect(service.findById(expectedCompany.id)).resolves.toEqual(expectedCompany)
    expect(prisma.company.findUniqueOrThrow).toHaveBeenCalledWith({ where: { id: expectedCompany.id } })
  })

  it('should find all Company', async () => {
    const expectedCompany = { ...randomCompany(), id: randomUUID() }

    jest.spyOn(prisma.company, 'findMany').mockResolvedValue([expectedCompany] as Company[])
    expect(service.findAll()).resolves.toEqual([expectedCompany])
    expect(prisma.company.findMany).toHaveBeenCalledTimes(1)
  })

  it('should update a Company', async () => {
    const company: Prisma.CompanyUpdateInput = randomCompany({ hasCompanyId: true })

    const expectedCompany = {
      id: randomUUID(),
      ...company
    }

    jest.spyOn(prisma.company, 'update').mockResolvedValue(expectedCompany as Company)
    expect(service.update(expectedCompany.id as string, company as Company)).resolves.toEqual(expectedCompany)
    expect(prisma.company.update).toHaveBeenCalledWith({ where: { id: expectedCompany.id }, data: company })
  })

  it('should delete a Company', async () => {
    const expectedCompany = { ...randomCompany(), id: randomUUID() }

    jest.spyOn(prisma.company, 'delete').mockResolvedValue(expectedCompany as Company)
    expect(service.delete(expectedCompany.id)).resolves.toEqual(expectedCompany)
    expect(prisma.company.delete).toHaveBeenCalledWith({ where: { id: expectedCompany.id } })
  })
})
