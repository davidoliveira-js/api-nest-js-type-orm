import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftCardController } from './giftCard.controller';
import { GiftCardService } from './giftCard.service';
import { GiftCardEntity } from './gifitCard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GiftCardEntity])],
  controllers: [GiftCardController],
  providers: [GiftCardService],
  exports: [GiftCardService],
})
export class GiftCardModule {}
