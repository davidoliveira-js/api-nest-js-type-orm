import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { GiftCardEntity } from './gifitCard.entity';
import { CreateGiftCardDto } from './dto/CreateGiftCard.dto';
import { ListGiftCardDto } from './dto/ListGiftCard.dto';
import { UpdateGiftCardDto } from './dto/UpdateGiftCard.dto';

@Injectable()
export class GiftCardService {
  constructor(
    @InjectRepository(GiftCardEntity)
    private readonly giftCardRepository: Repository<GiftCardEntity>
  ) {}

  async hashPin(pin: string): Promise<string> {
    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(pin, salt);
    return hash;
  }

  async findAllGiftCards() {
    const data = await this.giftCardRepository.find();
    const giftCards = data.map((giftCard) => {
      return new ListGiftCardDto(
        giftCard.id,
        giftCard.name,
        giftCard.price,
        giftCard.pin,
        giftCard.expiration_date,
        giftCard.isAvailable
      );
    });
    return giftCards;
  }

  async findOneGiftCardById(giftCardId: string) {
    const data = await this.giftCardRepository.findOne({
      where: { id: giftCardId },
    });

    const giftCard = new ListGiftCardDto(
      data.id,
      data.name,
      data.price,
      data.pin,
      data.expiration_date,
      data.isAvailable
    );
    return giftCard;
  }

  async getOneGiftCardById(giftCardId: string) {
    return await this.giftCardRepository.findOne({
      where: { id: giftCardId },
    });
  }

  async createGiftCard(data: CreateGiftCardDto) {
    data.pin = await this.hashPin(data.pin);
    const { id } = await this.giftCardRepository.save(data);
    return id;
  }

  async updateGiftCard(giftCardId: string, data: UpdateGiftCardDto) {
    return (await this.giftCardRepository.update(giftCardId, data))
      .affected;
  }

  async deleteGiftCard(giftCardId: string) {
    return (await this.giftCardRepository.delete(giftCardId))
      .affected;
  }
}
