import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { AuthModule } from './auth/auth.module'
import { validate } from './common/config/env.validation'
import { CompanyModule } from './company/company.module'
import { LocationModule } from './location/location.module'
import { PrismaService } from './prisma.service'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    UserModule,
    CompanyModule,
    LocationModule,
    AuthModule,
    JwtModule
  ],
  controllers: [],
  providers: [PrismaService, JwtService],
})
export class AppModule { }
