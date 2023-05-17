import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { AcquisitionService } from './acquisition.service';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { CreateAcquisitionDto } from './dto/CreateAcquisition.dto';

@Controller('/acquisitions')
export class AcquisitionController {
  constructor(private acquisitionService: AcquisitionService) {}

  @Get()
  async getAll() {
    const acquisitions =
      await this.acquisitionService.findAllAcquisitions();
    return acquisitions;
  }

  @Get('/:acquisitionId')
  async getOneById(@Param('acquisitionId') id: string) {
    const acquisition =
      await this.acquisitionService.findOneAcquisitionById(id);
    if (!acquisition) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Pagamento não encontrado.',
      });
    }
    return acquisition;
  }

  @Post()
  async create(@Body() data: CreateAcquisitionDto) {
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
