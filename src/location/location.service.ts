import { Injectable } from '@nestjs/common'
import { Location } from '@prisma/client'
import { BaseCrudService } from '../common/base-crud.service'
import { PrismaService } from '../prisma.service'

@Injectable()
export class LocationService extends BaseCrudService<Location> {
  constructor(
    protected readonly prisma: PrismaService,
  ) {
    super(prisma, 'location')
  }
}
