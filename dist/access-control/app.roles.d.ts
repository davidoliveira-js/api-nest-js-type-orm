import { RolesBuilder } from 'nest-access-control';
export declare enum AppRoles {
    ADMIN = "admin",
    USER = "user"
}
export declare const roles: RolesBuilder;
