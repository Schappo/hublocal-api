import { Injectable } from '@nestjs/common'
import { Company } from '@prisma/client'
import { BaseCrudService } from '../common/base-crud.service'
import { PrismaService } from '../prisma.service'

@Injectable()
export class CompanyService extends BaseCrudService<Company> {
  constructor(
    protected readonly prisma: PrismaService
  ) {
    super(prisma, 'company')
  }

  async findAllWithQtdLocation(query: Partial<Company>, take, skip) {
    const companiesWithLocationCount = await this.prisma.company.findMany({
      where: query,
      skip,
      take,
      include: {
        _count: {
          select: {
            locations: true,
          },
        }
      },
    })
    const total = await this.prisma.company.count({
      where: query,
    })

    return {
      records: companiesWithLocationCount.map(({ _count, ...rest }) => ({
        ...rest,
        qtdLocations: _count.locations,
      })),
      total,
      skip,
      take,
    }
  }
}
