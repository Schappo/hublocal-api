import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { validate } from './common/config/env.validation'
import { PrismaService } from './prisma.service'
import { UserModule } from './user/user.module'

@Module({
  imports: [ConfigModule.forRoot({
    validate,
    isGlobal: true,
  }), UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
