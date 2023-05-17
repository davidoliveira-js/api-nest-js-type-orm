import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RechargeEntity, RechargeStatus } from './recharge.entity';
import { UserService } from 'src/user/user.service';
import { CreateRechargeDto } from './dto/CreateRecharge.dto';
import { ListRechargeDTO } from './dto/ListRecharge.dto';

@Injectable()
export class RechargeService {
  constructor(
    @InjectRepository(RechargeEntity)
    private readonly rechargeRepository: Repository<RechargeEntity>,
    private userService: UserService
  ) {}

  async findAllRecharges() {
    const data = await this.rechargeRepository.find({
      relations: { user: true },
    });
    const recharges = data.map((recharge) => {
      const { user } = recharge;
      return new ListRechargeDTO(
        recharge.id,
        recharge.value,
        recharge.status,
        { id: user.id, username: user.username }
      );
    });
    return recharges;
  }

  async findOneRechargeById(rechargeId: string) {
    const data = await this.rechargeRepository.findOne({
      where: { id: rechargeId },
      relations: { user: true },
    });

    const { user } = data;
    const recharge = new ListRechargeDTO(
      data.id,
      data.value,
      data.status,
      { id: user.id, username: user.username }
    );
    return recharge;
  }

  async createRecharge(data: CreateRechargeDto) {
    const rechargeUser = await this.userService.getOneUserById(
      data.userId
    );

    if (!rechargeUser) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const { id } = await this.rechargeRepository.save({
      user: rechargeUser,
      ...data,
    });

    return id;
  }

  async payRecharge(rechargeId: string) {
    const recharge = await this.rechargeRepository.findOne({
      relations: { user: true },
      where: { id: rechargeId },
    });

    if (!recharge) {
      throw new NotFoundException('Recarga não encontrada.');
    }
    if (recharge.status === RechargeStatus.Payd) {
      throw new BadRequestException('Requisição inválida.');
    }
    if (recharge.status === RechargeStatus.Expired) {
      throw new BadRequestException('Cobrança expirada.');
    }

    return await this.rechargeRepository.manager.transaction(
      async (transactionalRechargeEntityManager) => {
        try {
          await transactionalRechargeEntityManager.update(
            RechargeEntity,
            rechargeId,
            {
              status: RechargeStatus.Payd,
            }
          );

          const { user } = recharge;

          await this.userService.updateCredits(
            user.id,
            user.credits,
            recharge.value
          );

          return true;
        } catch (error) {
          throw new InternalServerErrorException('Algo deu errado.');
        }
      }
    );
  }
}
