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
}
