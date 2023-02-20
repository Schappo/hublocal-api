import { Test, TestingModule } from '@nestjs/testing'
import { Location, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { randomLocation } from '../common/helpers'
import { PrismaService } from '../prisma.service'
import { LocationService } from './location.service'

describe('LocationService', () => {
  let service: LocationService
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationService, PrismaService],
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
})
