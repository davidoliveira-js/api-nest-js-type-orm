import { RolesBuilder } from 'nest-access-control';
export declare enum Roles {
    ADMIN = "admin",
    USER = "user"
}
export declare const roles: RolesBuilder;
