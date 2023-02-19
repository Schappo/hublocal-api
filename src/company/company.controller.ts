import { Controller } from '@nestjs/common'
import { Company } from '@prisma/client'
import { BaseCrudController } from '../common/base-crud.controller'
import { CompanyService } from './company.service'

@Controller('company')
export class CompanyController extends BaseCrudController<Company> {
  constructor(
    private readonly companyService: CompanyService
  ) {
    super(companyService)
  }
}
