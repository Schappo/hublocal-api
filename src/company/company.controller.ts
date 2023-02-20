import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Company } from '@prisma/client'
import { CompanyService } from './company.service'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'

@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService
  ) { }

  @Get()
  async findAll(): Promise<Company[]> {
    return await this.companyService.findAll()
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Company> {
    return await this.companyService.findById(id)
  }

  @Post()
  async create(@Body() data: CreateCompanyDto): Promise<Company> {
    return await this.companyService.create(data)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateCompanyDto): Promise<Company> {
    return await this.companyService.update(id, data)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Company> {
    return await this.companyService.delete(id)
  }
}