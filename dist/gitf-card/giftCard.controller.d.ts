import { GiftCardService } from './giftCard.service';
import { CreateGiftCardDto } from './dto/CreateGiftCard.dto';
import { UpdateGiftCardDto } from './dto/UpdateGiftCard.dto';
export declare class GiftCardController {
    private giftCardService;
    constructor(giftCardService: GiftCardService);
    getAll(): Promise<import("./dto/ListGiftCard.dto").ListGiftCardDto[]>;
    getOneById(id: string): Promise<import("./dto/ListGiftCard.dto").ListGiftCardDto>;
    create(data: CreateGiftCardDto): Promise<import("../core/http/nest-response").NestResponse>;
    update(data: UpdateGiftCardDto, id: string): Promise<void>;
    delete(id: string): Promise<void>;
}
