import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Company, User } from '@prisma/client'
import { JwtPayload } from '../common/decorators/jwt-payload.decorator'
import { CompanyGuard } from '../common/guards/company.guard'
import { PaginatedResponse, QueryType } from '../common/types'
import { CompanyService } from './company.service'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'

@Controller('company')
@UseGuards(AuthGuard('jwt'))
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService
  ) { }

  @Get()
  async findAll(@JwtPayload() user: User, @Query() query: Partial<Company>): Promise<Company[]> {
    return await this.companyService.find({ ...query, userId: user.id })
  }

  @Get('paginated')
  async findAllC(
    @JwtPayload() user: User,
    @Query() query: QueryType<Company>,
  ): Promise<PaginatedResponse<Company>> {
    const { skip, take, ...sanitizeQuery } = query
    const skipNum = Number(skip) || 0
    const takeNum = Number(take) || 10
    return await this.companyService.findAllWithQtdLocation(
      { ...sanitizeQuery, userId: user.id }, takeNum, skipNum)
  }

  @Get(':id')
  @UseGuards(CompanyGuard)
  async findById(@Param('id') id: string): Promise<Company> {
    return await this.companyService.findById(id)
  }

  @Post()
  async create(@JwtPayload() user: User, @Body() data: CreateCompanyDto): Promise<Company> {
    return await this.companyService.create({ ...data, userId: user.id })
  }

  @Put(':id')
  @UseGuards(CompanyGuard)
  async update(@Param('id') id: string, @Body() data: UpdateCompanyDto): Promise<Company> {
    return await this.companyService.update(id, data)
  }

  @Delete(':id')
  @UseGuards(CompanyGuard)
  async delete(@Param('id') id: string): Promise<Company> {
    return await this.companyService.delete(id)
  }
}