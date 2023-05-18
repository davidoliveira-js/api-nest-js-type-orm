import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { ACGuard, UseRoles, UserRoles } from 'nest-access-control';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/access-control/app.roles';

@Controller('/users')
@UseGuards(ACGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @UseRoles({
    resource: 'users',
    action: 'read',
    possession: 'any',
  })
  @Get()
  async getAll() {
    return await this.userService.findAllUsers();
  }

  @UseRoles({
    resource: 'users',
    action: 'read',
    possession: 'own',
  })
  @Get('/:userId')
  async getOneById(
    @Param('userId') id: string,
    @UserRoles() userRoles: string,
    @Request() req
  ) {
    if (userRoles !== Roles.ADMIN && req.user.id !== id) {
      throw new ForbiddenException();
    }
    return await this.userService.findOneUserById(id);
  }

  @Public()
  @Post()
  async create(@Body() data: CreateUserDto) {
    const newUserId = await this.userService.createUser(data);
    return new NestResponseBuilder()
      .setStatus(HttpStatus.CREATED)
      .setHeaders({
        Location: `/users/${newUserId}`,
      })
      .setBody({ id: newUserId })
      .build();
  }

  @UseRoles({
    resource: 'users',
    action: 'update',
    possession: 'own',
  })
  @Put('/:userId')
  async update(
    @Body() data: UpdateUserDto,
    @Param('userId') id: string,
    @UserRoles() userRoles,
    @Request() req
  ) {
    if (userRoles !== Roles.ADMIN && id !== req.user.id) {
      throw new ForbiddenException();
    }
    return await this.userService.updateUser(id, data);
  }

  @UseRoles({
    resource: 'users',
    action: 'read',
    possession: 'any',
  })
  @Delete('/:userId')
  async delete(@Param('userId') id: string) {
    return await this.userService.deleteUser(id);
  }
}
