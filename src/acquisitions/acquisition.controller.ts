import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AcquisitionService } from './acquisition.service';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { CreateAcquisitionDto } from './dto/CreateAcquisition.dto';
import { ACGuard, UseRoles, UserRoles } from 'nest-access-control';
import { Roles } from 'src/access-control/app.roles';

@Controller('/acquisitions')
@UseGuards(ACGuard)
export class AcquisitionController {
  constructor(private acquisitionService: AcquisitionService) {}

  @UseRoles({
    resource: 'recharges',
    action: 'read',
    possession: 'any',
  })
  @Get()
  async getAll() {
    const acquisitions =
      await this.acquisitionService.findAllAcquisitions();
    return acquisitions;
  }

  @UseRoles({
    resource: 'recharges',
    action: 'read',
    possession: 'own',
  })
  @Get('/:acquisitionId')
  async getOneById(
    @Param('acquisitionId') id: string,
    @UserRoles() userRoles: string,
    @Request() req
  ) {
    const acquisition =
      await this.acquisitionService.findOneAcquisitionById(
        id,
        userRoles,
        req.user.id
      );
    return acquisition;
  }

  @UseRoles({
    resource: 'recharges',
    action: 'create',
    possession: 'own',
  })
  @Post()
  async create(
    @Body() data: CreateAcquisitionDto,
    @Request() req,
    @UserRoles() userRoles
  ) {
    if (userRoles !== Roles.ADMIN && data.userId !== req.user.id) {
      throw new ForbiddenException();
    }
    const newAcquisitionId =
      await this.acquisitionService.createAcquisition(data);
    return new NestResponseBuilder()
      .setStatus(HttpStatus.CREATED)
      .setHeaders({
        Location: `/acquisitions/${newAcquisitionId}`,
      })
      .setBody({ id: newAcquisitionId })
      .build();
  }
}
