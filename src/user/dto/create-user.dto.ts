import { IsEmail, IsString, IsStrongPassword } from "class-validator"
import { IsRequired } from "../../validators/is-require.validator"


export class CreateUserDto {
  @IsEmail()
  @IsRequired()
  email: string

  @IsString()
  @IsRequired()
  name: string

  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
  @IsRequired()
  password: string
}