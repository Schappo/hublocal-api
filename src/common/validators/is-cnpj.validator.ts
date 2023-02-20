import {
  registerDecorator, ValidationArguments, ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ async: true })
class IsCnpjConstraint implements ValidatorConstraintInterface {
  validate(field: any, args: ValidationArguments) {
    return isValidCNPJ(field)
  };

  defaultMessage(args: ValidationArguments) {
    return `Must be a valid CNPJ.`
  }
}

export function IsCnpj(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCnpjConstraint,
    })
  }
}

export function isValidCNPJ(cnpj: string): boolean {
  // Remove period, slash and dash characters from CNPJ
  const cleaned = cnpj.toString().replace(/[\.\/\-]/g, '')

  if (
    // Must be defined
    !cleaned ||
    // Must have 14 characters
    cleaned.length !== 14 ||
    // Must be digits and not be sequential characters (e.g.: 11111111111111, etc)
    /^(\d)\1+$/.test(cleaned)
  ) {
    return false
  }

  let registration = cleaned.substring(0, 12)
  registration += digit(registration)
  registration += digit(registration)

  return registration.substring(-2) === cleaned.substring(-2)
}

function digit(numbers: string): number {
  let index = 2

  const sum = [...numbers].reverse().reduce((buffer, number) => {
    buffer += Number(number) * index
    index = index === 9 ? 2 : index + 1
    return buffer
  }, 0)

  const mod = sum % 11

  return mod < 2 ? 0 : 11 - mod
}