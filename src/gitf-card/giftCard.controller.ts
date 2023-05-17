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
import { GiftCardService } from './giftCard.service';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { CreateGiftCardDto } from './dto/CreateGiftCard.dto';
import { UpdateGiftCardDto } from './dto/UpdateGiftCard.dto';

@Controller('/gift-cards')
export class GiftCardController {
  constructor(private giftCardService: GiftCardService) {}

  @Get()
  async getAll() {
    const giftCards = await this.giftCardService.findAllGiftCards();
    return giftCards;
  }

  @Get('/:giftCardId')
  async getOneById(@Param('giftCardId') id: string) {
    const data = await this.giftCardService.findOneGiftCardById(id);
    if (!data) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Gift card não encontrado.',
      });
    }
    return data;
  }

  @Post()
  async create(@Body() data: CreateGiftCardDto) {
    const newGiftCardId = await this.giftCardService.createGiftCard(
      data
    );
    return new NestResponseBuilder()
      .setStatus(HttpStatus.CREATED)
      .setHeaders({
        Location: `/giftCards/${newGiftCardId}`,
      })
      .setBody({ id: newGiftCardId })
      .build();
  }

  @Put('/:giftCardId')
  async update(
    @Body() data: UpdateGiftCardDto,
    @Param('giftCardId') id: string
  ) {
    const updatedGiftCard = await this.giftCardService.updateGiftCard(
      id,
      data
    );
    if (!updatedGiftCard) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Gift card não encontrado.',
      });
    }
    return;
  }

  @Delete('/:giftCardId')
  async delete(@Param('giftCardId') id: string) {
    const deletedGiftCard = await this.giftCardService.deleteGiftCard(
      id
    );
    if (!deletedGiftCard) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Gift card não encontrado.',
      });
    }
    return;
  }
}
