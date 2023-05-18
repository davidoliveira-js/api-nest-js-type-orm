import { Module } from '@nestjs/common';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';

@Module({
  imports: [AccessControlModule.forRoles(roles)],
})
export class RolesGuardModule {}
