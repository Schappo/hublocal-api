import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma.service'
import { CompanyController } from './company.controller'
import { CompanyService } from './company.service'

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, PrismaService, JwtService]
})
export class CompanyModule { }
