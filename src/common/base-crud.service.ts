import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma.service"

@Injectable()
export class BaseCrudService<T> {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly modelName: string
  ) { }

  async find(query: Partial<T>): Promise<T[]> {
    return await this.prisma[this.modelName].findMany({
      where: query
    })
  }

  async findById(id: string): Promise<T> {
    return await this.prisma[this.modelName].findUniqueOrThrow({ where: { id } })
  }

  async create(data: Partial<T>): Promise<T> {
    return await this.prisma[this.modelName].create({ data })
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return await this.prisma[this.modelName].update({ where: { id }, data })
  }

  async delete(id: string): Promise<T> {
    return await this.prisma[this.modelName].delete({ where: { id } })
  }

}