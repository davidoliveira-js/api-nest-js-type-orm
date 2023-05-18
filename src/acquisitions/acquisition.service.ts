import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcquisitionEntity } from './acquisition.entity';
import { ListAcquisitionDTO } from './dto/ListAcquisition.dto';
import { CreateAcquisitionDto } from './dto/CreateAcquisition.dto';
import { UserService } from 'src/user/user.service';
import { GiftCardService } from 'src/gitf-card/giftCard.service';
import { Roles } from 'src/access-control/app.roles';
import { UpdateGiftCardDto } from 'src/gitf-card/dto/UpdateGiftCard.dto';

@Injectable()
export class AcquisitionService {
  constructor(
    @InjectRepository(AcquisitionEntity)
    private readonly acquisitionRepository: Repository<AcquisitionEntity>,
    private userService: UserService,
    private giftCardService: GiftCardService
  ) {}

  async findAllAcquisitions() {
    const data = await this.acquisitionRepository.find({
      relations: { user: true, giftCard: true },
    });
    const acquisitions = data.map((acquisition) => {
      const { giftCard, user } = acquisition;
      return new ListAcquisitionDTO(
        acquisition.id,
        acquisition.price,
        { id: giftCard.id, name: giftCard.name },
        { id: user.id, username: user.username }
      );
    });
    return acquisitions;
  }

  async findOneAcquisitionById(
    acquisitionId: string,
    userRoles: string,
    userId: string
  ) {
    const data = await this.acquisitionRepository.findOne({
      where: { id: acquisitionId },
      relations: { giftCard: true, user: true },
    });

    if (!data) {
      throw new NotFoundException();
    }

    if (userRoles !== Roles.ADMIN && userId !== data.user.id) {
      throw new ForbiddenException();
    }

    const { giftCard, user } = data;
    const acquisition = new ListAcquisitionDTO(
      data.id,
      data.price,
      { id: giftCard.id, name: giftCard.name },
      { id: user.id, username: user.username }
    );
    return acquisition;
  }

  async createAcquisition(data: CreateAcquisitionDto) {
    const acquisitionUser = await this.userService.getOneUserById(
      data.userId
    );
    const acquisitionGiftCard =
      await this.giftCardService.getOneGiftCardById(data.giftCardId);

    if (!acquisitionUser) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    if (!acquisitionGiftCard) {
      throw new NotFoundException('Gift card não encontrado.');
    }

    return await this.acquisitionRepository.manager.transaction(
      async (transactionalAcquisitionManager) => {
        const newAcquisition = new AcquisitionEntity();
        newAcquisition.price = acquisitionGiftCard.price;
        newAcquisition.giftCard = acquisitionGiftCard;
        newAcquisition.user = acquisitionUser;
        const acquisition =
          await transactionalAcquisitionManager.save(newAcquisition);

        const giftCard = new UpdateGiftCardDto();
        giftCard.isAvailable = false;

        await this.giftCardService.updateGiftCard(
          data.giftCardId,
          giftCard
        );

        await this.userService.updateCredits(
          data.userId,
          acquisitionUser.credits,
          -acquisitionGiftCard.price
        );

        return acquisition.id;
      }
    );
  }
}
