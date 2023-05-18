import { Repository } from 'typeorm';
import { GiftCardEntity } from './gifitCard.entity';
import { CreateGiftCardDto } from './dto/CreateGiftCard.dto';
import { ListGiftCardUserDto } from './dto/ListGiftCardUser.dto';
import { ListGiftCardAdminDto } from './dto/ListGiftCardAdmin.dto ';
import { UpdateGiftCardDto } from './dto/UpdateGiftCard.dto';
export declare class GiftCardService {
    private readonly giftCardRepository;
    constructor(giftCardRepository: Repository<GiftCardEntity>);
    hashPin(pin: string): Promise<string>;
    findAllGiftCards(userRoles: string): Promise<(ListGiftCardAdminDto | ListGiftCardUserDto)[]>;
    findOneGiftCardById(giftCardId: string, userRoles: string): Promise<ListGiftCardAdminDto | ListGiftCardUserDto>;
    getOneGiftCardById(giftCardId: string): Promise<GiftCardEntity>;
    createGiftCard(data: CreateGiftCardDto): Promise<string>;
    updateGiftCard(giftCardId: string, data: UpdateGiftCardDto): Promise<void>;
    deleteGiftCard(giftCardId: string): Promise<void>;
}
