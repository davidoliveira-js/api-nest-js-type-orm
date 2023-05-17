import { GiftCardEntity } from 'src/gitf-card/gifitCard.entity';
import { UserEntity } from 'src/user/user.entity';
export declare class AcquisitionEntity {
    id: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    user: UserEntity;
    giftCard: GiftCardEntity;
}
