import { BadRequestException, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvironmentVariables } from './common/config/env.validation'
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filter'
import { PrismaService } from './prisma.service'


async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  const exceptionFactory = (errors) => new BadRequestException(errors)
  app.useGlobalPipes(new ValidationPipe({ exceptionFactory }))

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  const configService = app.get(ConfigService<EnvironmentVariables, true>)
  await app.listen(configService.getOrThrow('PORT'), '0.0.0.0')
}
bootstrap()