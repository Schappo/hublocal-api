import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvironmentVariables } from './config/env.validation'
import { PrismaService } from './prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get(ConfigService<EnvironmentVariables, true>)
  await app.listen(configService.getOrThrow('PORT'), '0.0.0.0')
}
bootstrap()