import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Location } from '@prisma/client'
import { PaginatedResponse, QueryType } from '../common/types'
import { CreateLocationDto } from './dto/create-location.dto'
import { UpdateLocationDto } from './dto/update-location.dto'
import { LocationService } from './location.service'

@Controller('location')
@UseGuards(AuthGuard('jwt'))
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
  ) { }

  @Get()
  async findAll(@Query() query: Partial<Location>): Promise<Location[]> {
    return await this.locationService.find(query)
  }

  @Get('paginated')
  async findAllPaginated(
    @Query() query: QueryType<Location>
  ): Promise<PaginatedResponse<Location>> {
    const { skip, take, ...sanitizeQuery } = query
    const skipNum = Number(skip) || 0
    const takeNum = Number(take) || 10
    return await this.locationService.findPaginated(sanitizeQuery, takeNum, skipNum)
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Location> {
    return await this.locationService.findById(id)
  }

  @Post()
  async create(@Body() data: CreateLocationDto): Promise<Location> {
    return await this.locationService.create(data)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateLocationDto): Promise<Location> {
    return await this.locationService.update(id, data)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Location> {
    return await this.locationService.delete(id)
  }
}
