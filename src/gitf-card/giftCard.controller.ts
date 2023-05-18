import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GiftCardService } from './giftCard.service';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { CreateGiftCardDto } from './dto/CreateGiftCard.dto';
import { UpdateGiftCardDto } from './dto/UpdateGiftCard.dto';
import { UseRoles, UserRoles, ACGuard } from 'nest-access-control';

@Controller('/gift-cards')
@UseGuards(ACGuard)
export class GiftCardController {
  constructor(private giftCardService: GiftCardService) {}

  @UseRoles({
    resource: 'giftCards',
    action: 'read',
    possession: 'any',
  })
  @Get()
  async getAll(@UserRoles() userRoles: string) {
    const giftCards = await this.giftCardService.findAllGiftCards(
      userRoles
    );
    return giftCards;
  }

  @UseRoles({
    resource: 'giftCards',
    action: 'read',
    possession: 'any',
  })
  @Get('/:giftCardId')
  async getOneById(
    @Param('giftCardId') id: string,
    @UserRoles() userRoles: string
  ) {
    const giftCard = await this.giftCardService.findOneGiftCardById(
      id,
      userRoles
    );
    return giftCard;
  }

  @UseRoles({
    resource: 'giftCards',
    action: 'create',
    possession: 'any',
  })
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

  @UseRoles({
    resource: 'giftCards',
    action: 'update',
    possession: 'any',
  })
  @Put('/:giftCardId')
  async update(
    @Body() data: UpdateGiftCardDto,
    @Param('giftCardId') id: string
  ) {
    return await this.giftCardService.updateGiftCard(id, data);
  }

  @UseRoles({
    resource: 'giftCards',
    action: 'delete',
    possession: 'any',
  })
  @Delete('/:giftCardId')
  async delete(@Param('giftCardId') id: string) {
    return await this.giftCardService.deleteGiftCard(id);
  }
}
