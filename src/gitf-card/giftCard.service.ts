import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { GiftCardEntity } from './gifitCard.entity';
import { CreateGiftCardDto } from './dto/CreateGiftCard.dto';
import { ListGiftCardUserDto } from './dto/ListGiftCardUser.dto';
import { ListGiftCardAdminDto } from './dto/ListGiftCardAdmin.dto ';
import { UpdateGiftCardDto } from './dto/UpdateGiftCard.dto';
import { Roles } from 'src/access-control/app.roles';

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

  async findAllGiftCards(userRoles: string) {
    const data = await this.giftCardRepository.find({
      where: userRoles !== Roles.ADMIN ? { isAvailable: true } : {},
    });
    const giftCards = data.map((giftCard) => {
      return userRoles === Roles.ADMIN
        ? new ListGiftCardAdminDto(
            giftCard.id,
            giftCard.name,
            giftCard.price,
            giftCard.pin,
            giftCard.expiration_date,
            giftCard.isAvailable
          )
        : new ListGiftCardUserDto(
            giftCard.id,
            giftCard.name,
            giftCard.price
          );
    });
    return giftCards;
  }

  async findOneGiftCardById(giftCardId: string, userRoles: string) {
    const data = await this.giftCardRepository.findOne({
      where:
        userRoles === Roles.ADMIN
          ? { id: giftCardId }
          : { id: giftCardId, isAvailable: true },
    });

    if (!data) {
      throw new NotFoundException();
    }

    const giftCard =
      userRoles === Roles.ADMIN
        ? new ListGiftCardAdminDto(
            data.id,
            data.name,
            data.price,
            data.pin,
            data.expiration_date,
            data.isAvailable
          )
        : new ListGiftCardUserDto(data.id, data.name, data.price);
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
    const updatedGiftCard = (
      await this.giftCardRepository.update(giftCardId, data)
    ).affected;
    if (!updatedGiftCard) {
      throw new NotFoundException();
    }
    return;
  }

  async deleteGiftCard(giftCardId: string) {
    try {
      const deletedGiftCard = (
        await this.giftCardRepository.delete(giftCardId)
      ).affected;
      if (!deletedGiftCard) {
        throw new NotFoundException();
      }
      return;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException();
      }
      throw new InternalServerErrorException();
    }
  }
}
