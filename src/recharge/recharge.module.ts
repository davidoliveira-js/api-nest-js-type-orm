import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RechargeController } from './recharge.controller';
import { RechargeService } from './recharge.service';
import { RechargeEntity } from './recharge.entity';
import { UserModule } from 'src/user/user.module';
import { GiftCardModule } from 'src/gitf-card/giftCard.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RechargeEntity]),
    UserModule,
    GiftCardModule,
  ],
  controllers: [RechargeController],
  providers: [RechargeService],
  exports: [RechargeService],
})
export class RechargeModule {}
