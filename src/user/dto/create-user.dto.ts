import { IsEmail, IsString, IsStrongPassword } from "class-validator"
import { IsRequired } from "../../common/validators/is-require.validator"


export class CreateUserDto {
  @IsEmail()
  @IsRequired()
  email: string

  @IsString()
  @IsRequired()
  name: string

  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }, { message: 'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number and one symbol.' })
  @IsRequired()
  password: string
}