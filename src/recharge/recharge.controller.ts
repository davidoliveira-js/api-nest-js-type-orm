import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RechargeService } from './recharge.service';
import { CreateRechargeDto } from './dto/CreateRecharge.dto';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { ACGuard, UseRoles, UserRoles } from 'nest-access-control';
import { Roles } from 'src/access-control/app.roles';

@Controller('/recharges')
@UseGuards(ACGuard)
export class RechargeController {
  constructor(private rechargeService: RechargeService) {}

  @UseRoles({
    resource: 'recharges',
    action: 'read',
    possession: 'any',
  })
  @Get()
  async getAll() {
    const recharges = await this.rechargeService.findAllRecharges();
    return recharges;
  }

  @UseRoles({
    resource: 'recharges',
    action: 'read',
    possession: 'own',
  })
  @Get('/:rechargeId')
  async getOneById(
    @Param('rechargeId') id: string,
    @UserRoles() userRoles: string,
    @Request() req
  ) {
    const { user } = req;
    return await this.rechargeService.findOneRechargeById(
      id,
      userRoles,
      user.id
    );
  }

  @UseRoles({
    resource: 'recharges',
    action: 'create',
    possession: 'own',
  })
  @Post()
  async create(
    @Body() data: CreateRechargeDto,
    @Request() req,
    @UserRoles() userRoles: string
  ) {
    if (userRoles !== Roles.ADMIN && data.userId !== req.user.id) {
      throw new ForbiddenException();
    }
    const newRechargeId = await this.rechargeService.createRecharge(
      data
    );
    return new NestResponseBuilder()
      .setStatus(HttpStatus.CREATED)
      .setHeaders({
        Location: `/recharges/${newRechargeId}`,
      })
      .setBody({ id: newRechargeId })
      .build();
  }

  @UseRoles({
    resource: 'recharges',
    action: 'create',
    possession: 'own',
  })
  @HttpCode(HttpStatus.OK)
  @Post('/:rechargeId')
  async pay(
    @Param('rechargeId') rechargeId: string,
    @Request() req,
    @UserRoles() userRoles: string
  ) {
    const payment = await this.rechargeService.payRecharge(
      rechargeId,
      req.user.id,
      userRoles
    );
    if (!payment) {
      throw new InternalServerErrorException('Algo deu errado.');
    }
    return { id: rechargeId };
  }
}
