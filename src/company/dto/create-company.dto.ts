import { IsNumberString, IsString, MaxLength, MinLength } from "class-validator"
import { IsCnpj } from "../../common/validators/is-cnpj.validator"
import { IsRequired } from "../../common/validators/is-require.validator"

export class CreateCompanyDto {
  @IsString()
  name: string

  @IsString()
  webSite: string

  @IsString()
  @IsNumberString()
  @IsCnpj()
  @MaxLength(14)
  @MinLength(14)
  cnpj: string

  @IsRequired()
  userId: string
}