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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll() {
    const users = await this.userService.findAllUsers();
    return users;
  }

  @Get('/:userId')
  async getOneById(@Param('userId') id: string) {
    const data = await this.userService.findOneUserById(id);
    if (!data) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Usuário não encontrado.',
      });
    }
    return data;
  }

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

  @Put('/:userId')
  async update(
    @Body() data: UpdateUserDto,
    @Param('userId') id: string
  ) {
    const updatedUser = await this.userService.updateUser(id, data);
    if (!updatedUser) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Usuário não encontrado.',
      });
    }
    return;
  }

  @Delete('/:userId')
  async delete(@Param('userId') id: string) {
    const deletedUser = await this.userService.deleteUser(id);
    if (!deletedUser) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Usuário não encontrado.',
      });
    }
    return;
  }
}
