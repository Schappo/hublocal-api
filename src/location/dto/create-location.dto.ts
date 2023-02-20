import { IsString, IsUUID } from "class-validator"
import { IsRequired } from "../../common/validators/is-require.validator"


export class CreateLocationDto {
  @IsString()
  @IsRequired()
  name: string

  @IsString()
  @IsRequired()
  street: string

  @IsString()
  @IsRequired()
  postalCode: string

  @IsString()
  @IsRequired()
  number: string

  @IsString()
  @IsRequired()
  district: string

  @IsString()
  @IsRequired()
  city: string

  @IsString()
  @IsRequired()
  state: string

  @IsUUID()
  @IsRequired()
  companyId: string

}