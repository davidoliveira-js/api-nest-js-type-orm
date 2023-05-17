import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcquisitionController } from './acquisition.controller';
import { AcquisitionService } from './acquisition.service';
import { AcquisitionEntity } from './acquisition.entity';
import { UserModule } from 'src/user/user.module';
import { GiftCardModule } from 'src/gitf-card/giftCard.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AcquisitionEntity]),
    UserModule,
    GiftCardModule,
  ],
  controllers: [AcquisitionController],
  providers: [AcquisitionService],
  exports: [AcquisitionService],
})
export class AcquisitionModule {}
