import { Injectable, Module } from '@nestjs/common';
import {
  AccessControlModule,
  RolesBuilder,
} from 'nest-access-control';

@Injectable()
class RoleService {
  getRoles(): Promise<string[]> {
    return Promise.resolve(['my-custom-role']);
  }
}

@Module({
  providers: [RoleService],
  exports: [RoleService],
})
class RoleModule {}

@Module({
  imports: [
    AccessControlModule.forRootAsync({
      imports: [RoleModule],
      inject: [RoleService],
      useFactory: async (
        roleService: RoleService
      ): Promise<RolesBuilder> => {
        return new RolesBuilder(await roleService.getRoles());
      },
    }),
  ],
})
export class AccessModule {}
