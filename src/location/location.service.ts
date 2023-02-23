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

  async findPaginated(query: Partial<Location>, take, skip) {
    const locations = await this.prisma.location.findMany({
      where: { ...query },
      skip,
      take,
    })

    const total = await this.prisma.location.count({
      where: query,
    })

    return {
      records: locations,
      total,
      skip,
      take,
    }
  }
}
