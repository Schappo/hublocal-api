import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvironmentVariables } from './config/env.validation'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService<EnvironmentVariables, true>)
  await app.listen(configService.getOrThrow('PORT'), '0.0.0.0')
}
bootstrap()