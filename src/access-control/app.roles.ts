import { RolesBuilder } from 'nest-access-control';

export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(Roles.USER)
  .createOwn(['acquisitions', 'recharges'])
  .readOwn(['users', 'acquisitions', 'recharges'])
  .readAny('giftCards')
  .updateOwn(['users'])
  .grant(Roles.ADMIN)
  .createAny(['users', 'acquisitions', 'giftCards', 'recharges'])
  .readAny(['users', 'acquisitions', 'giftCards', 'recharges'])
  .updateAny(['users', 'giftCards'])
  .deleteAny(['users', 'giftCards']);
