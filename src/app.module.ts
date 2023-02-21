import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { validate } from './common/config/env.validation'
import { CompanyModule } from './company/company.module'
import { LocationModule } from './location/location.module'
import { PrismaService } from './prisma.service'
import { UserModule } from './user/user.module'

@Module({
  imports: [ConfigModule.forRoot({
    validate,
    isGlobal: true,
  }), UserModule, CompanyModule, LocationModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
