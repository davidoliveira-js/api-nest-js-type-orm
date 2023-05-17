import { Role } from 'src/enums/role.enum';
export declare class CreateUserDto {
    username: string;
    email: string;
    password: string;
    credits: number;
    role: Role;
}
