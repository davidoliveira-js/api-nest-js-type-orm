import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  ADMIN = 'admin',
  USER = 'user',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.ADMIN)
  .readAny(['users'])
  .createAny(['users'])
  .updateAny(['users'])
  .deleteAny(['users'])
  .grant(AppRoles.USER)
  .readOwn(['users']);
