import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { BaseCrudService } from './base-crud.service'

@Controller()
export abstract class BaseCrudController<T> {
  constructor(
    private readonly baseService: BaseCrudService<T>,
  ) { }

  @Get()
  async findAll(): Promise<T[]> {
    return await this.baseService.findAll()
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<T> {
    return await this.baseService.findById(id)
  }

  @Post()
  async create(@Body() data: Omit<T, 'id'>): Promise<T> {
    return await this.baseService.create(data)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Omit<T, 'id'>): Promise<T> {
    return await this.baseService.update(id, data)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<T> {
    return await this.baseService.delete(id)
  }
}