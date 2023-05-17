import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { RechargeService } from './recharge.service';
import { CreateRechargeDto } from './dto/CreateRecharge.dto';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';

@Controller('/recharges')
export class RechargeController {
  constructor(private rechargeService: RechargeService) {}

  @Get()
  async getAll() {
    const recharges = await this.rechargeService.findAllRecharges();
    return recharges;
  }

  @Get('/:rechargeId')
  async getOneById(@Param('rechargeId') id: string) {
    const recharge = await this.rechargeService.findOneRechargeById(
      id
    );
    if (!recharge) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Recarga não encontrado.',
      });
    }
    return recharge;
  }

  @Post()
  async create(@Body() data: CreateRechargeDto) {
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

  @Post('/:rechargeId')
  async pay(@Param('rechargeId') rechargeId: string) {
    const payment = await this.rechargeService.payRecharge(
      rechargeId
    );
    if (!payment) {
      throw new InternalServerErrorException('Algo deu errado.');
    }
    return;
  }
}
