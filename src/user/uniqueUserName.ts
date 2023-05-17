import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserService } from './user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint()
export class UniqueUserNameValidator
  implements ValidatorConstraintInterface
{
  constructor(private userService: UserService) {}

  async validate(
    value: string,
    validationArguments?: ValidationArguments
  ): Promise<boolean> {
    return !!!this.userService.findOneUserByUsername(value);
  }
}

export const UniqueUserName = (
  validationOptions: ValidationOptions
) => {
  return (obtect: Object, prop: string) => {
    registerDecorator({
      target: obtect.constructor,
      propertyName: prop,
      options: validationOptions,
      constraints: [],
      validator: UniqueUserNameValidator,
    });
  };
};
