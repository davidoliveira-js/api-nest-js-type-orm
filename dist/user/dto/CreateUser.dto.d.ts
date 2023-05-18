import { Roles } from 'src/access-control/app.roles';
export declare class CreateUserDto {
    username: string;
    email: string;
    password: string;
    credits: number;
    role: Roles;
}
