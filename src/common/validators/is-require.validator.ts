import {
  registerDecorator, ValidationArguments, ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ async: true })
class IsRequiredConstraint implements ValidatorConstraintInterface {
  validate(field: any, args: ValidationArguments) {
    return !!field
  };

  defaultMessage(args: ValidationArguments) {
    return `${args.property} is required`
  }
}

export function IsRequired(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRequiredConstraint,
    })
  }
}