import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Location } from '@prisma/client'
import { CreateLocationDto } from './dto/create-location.dto'
import { UpdateLocationDto } from './dto/update-location.dto'
import { LocationService } from './location.service'

@Controller('location')
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
  ) { }

  @Get()
  async findAll(): Promise<Location[]> {
    return await this.locationService.findAll()
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
