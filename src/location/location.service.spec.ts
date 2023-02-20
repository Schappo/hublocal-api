import { Test, TestingModule } from '@nestjs/testing'
import { Location, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { randomLocation } from '../common/helpers'
import { CompanyService } from '../company/company.service'
import { PrismaService } from '../prisma.service'
import { LocationService } from './location.service'

describe('LocationService', () => {
  let service: LocationService
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationService, PrismaService, CompanyService],
    }).compile()

    service = module.get<LocationService>(LocationService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a location', async () => {
    const location: Prisma.LocationCreateInput = randomLocation({ hasCompanyId: true })

    const expectedLocation = {
      id: randomUUID(),
      ...location,
      companyId: randomUUID(),
    }

    jest.spyOn(prisma.location, 'create').mockResolvedValue(expectedLocation)
    expect(service.create(location)).resolves.toEqual(expectedLocation)
    expect(prisma.location.create).toHaveBeenCalledWith({ data: location })
  })

  it('should find a location by id', async () => {
    const expectedLocation = { ...randomLocation(), id: randomUUID() }

    jest.spyOn(prisma.location, 'findUniqueOrThrow').mockResolvedValue(expectedLocation as Location)
    expect(service.findById(expectedLocation.id)).resolves.toEqual(expectedLocation)
    expect(prisma.location.findUniqueOrThrow).toHaveBeenCalledWith({ where: { id: expectedLocation.id } })
  })

  it('should find all location', async () => {
    const expectedLocation = { ...randomLocation(), id: randomUUID() }

    jest.spyOn(prisma.location, 'findMany').mockResolvedValue([expectedLocation] as Location[])
    expect(service.findAll()).resolves.toEqual([expectedLocation])
    expect(prisma.location.findMany).toHaveBeenCalledTimes(1)
  })

  it('should update a location', async () => {
    const location: Prisma.LocationUpdateInput = randomLocation({ hasCompanyId: true })

    const expectedLocation = {
      id: randomUUID(),
      ...location,
    }

    jest.spyOn(prisma.location, 'update').mockResolvedValue(expectedLocation as Location)
    expect(service.update(expectedLocation.id as string, location as Location)).resolves.toEqual(expectedLocation)
    expect(prisma.location.update).toHaveBeenCalledWith({ data: location, where: { id: expectedLocation.id } })
  })

  it('should delete a location', async () => {
    const id = randomUUID()

    jest.spyOn(prisma.location, 'delete').mockResolvedValue({ id } as Location)
    expect(service.delete(id)).resolves.toEqual({ id })
    expect(prisma.location.delete).toHaveBeenCalledWith({ where: { id } })
  })
})
