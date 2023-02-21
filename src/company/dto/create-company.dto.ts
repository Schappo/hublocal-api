import { IsNumberString, IsString, MaxLength, MinLength } from "class-validator"
import { IsCnpj } from "../../common/validators/is-cnpj.validator"

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
}