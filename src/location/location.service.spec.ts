import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma.service'
import { LocationService } from './location.service'

describe('LocationService', () => {
  let service: LocationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationService, PrismaService],
    }).compile()

    service = module.get<LocationService>(LocationService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
