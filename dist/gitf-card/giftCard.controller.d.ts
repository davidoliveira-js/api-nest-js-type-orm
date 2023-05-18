import { GiftCardService } from './giftCard.service';
import { CreateGiftCardDto } from './dto/CreateGiftCard.dto';
import { UpdateGiftCardDto } from './dto/UpdateGiftCard.dto';
export declare class GiftCardController {
    private giftCardService;
    constructor(giftCardService: GiftCardService);
    getAll(userRoles: string): Promise<(import("./dto/ListGiftCardAdmin.dto ").ListGiftCardAdminDto | import("./dto/ListGiftCardUser.dto").ListGiftCardUserDto)[]>;
    getOneById(id: string, userRoles: string): Promise<import("./dto/ListGiftCardAdmin.dto ").ListGiftCardAdminDto | import("./dto/ListGiftCardUser.dto").ListGiftCardUserDto>;
    create(data: CreateGiftCardDto): Promise<import("../core/http/nest-response").NestResponse>;
    update(data: UpdateGiftCardDto, id: string): Promise<void>;
    delete(id: string): Promise<void>;
}
