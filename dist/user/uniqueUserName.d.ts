import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { UserService } from './user.service';
export declare class UniqueUserNameValidator implements ValidatorConstraintInterface {
    private userService;
    constructor(userService: UserService);
    validate(value: string, validationArguments?: ValidationArguments): Promise<boolean>;
}
export declare const UniqueUserName: (validationOptions: ValidationOptions) => (obtect: Object, prop: string) => void;
