import { Repository } from 'typeorm';
import { GiftCardEntity } from './gifitCard.entity';
import { CreateGiftCardDto } from './dto/CreateGiftCard.dto';
import { ListGiftCardDto } from './dto/ListGiftCard.dto';
import { UpdateGiftCardDto } from './dto/UpdateGiftCard.dto';
export declare class GiftCardService {
    private readonly giftCardRepository;
    constructor(giftCardRepository: Repository<GiftCardEntity>);
    hashPin(pin: string): Promise<string>;
    findAllGiftCards(): Promise<ListGiftCardDto[]>;
    findOneGiftCardById(giftCardId: string): Promise<ListGiftCardDto>;
    getOneGiftCardById(giftCardId: string): Promise<GiftCardEntity>;
    createGiftCard(data: CreateGiftCardDto): Promise<string>;
    updateGiftCard(giftCardId: string, data: UpdateGiftCardDto): Promise<number>;
    deleteGiftCard(giftCardId: string): Promise<number>;
}
