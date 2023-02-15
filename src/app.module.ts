import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { validate } from './config/env.validation'
import { PrismaService } from './prisma.service'

@Module({
  imports: [ConfigModule.forRoot({
    validate,
    isGlobal: true,
  })],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
