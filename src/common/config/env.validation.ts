import { plainToInstance, Transform } from 'class-transformer'
import { IsEnum, IsNumber, IsString, IsUrl, validateSync } from 'class-validator'

export enum NodeEnvironment {
  Development = 'development',
  Production = 'production',
}

export class EnvironmentVariables {
  @IsEnum(NodeEnvironment)
  NODE_ENV: NodeEnvironment = NodeEnvironment.Development;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  PORT = 3000;

  @IsString()
  @IsUrl({ protocols: ['postgres', 'postgresql'], require_tld: false, require_valid_protocol: false })
  DATABASE_URL!: string

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  SALT: number

  @IsString()
  JWT_SECRET: string
}

export type Env = EnvironmentVariables

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true })
  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return validatedConfig
}
