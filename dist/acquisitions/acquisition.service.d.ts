import { Repository } from 'typeorm';
import { AcquisitionEntity } from './acquisition.entity';
import { ListAcquisitionDTO } from './dto/ListAcquisition.dto';
import { CreateAcquisitionDto } from './dto/CreateAcquisition.dto';
import { UserService } from 'src/user/user.service';
import { GiftCardService } from 'src/gitf-card/giftCard.service';
export declare class AcquisitionService {
    private readonly acquisitionRepository;
    private userService;
    private giftCardService;
    constructor(acquisitionRepository: Repository<AcquisitionEntity>, userService: UserService, giftCardService: GiftCardService);
    findAllAcquisitions(): Promise<ListAcquisitionDTO[]>;
    findOneAcquisitionById(acquisitionId: string, userRoles: string, userId: string): Promise<ListAcquisitionDTO>;
    createAcquisition(data: CreateAcquisitionDto): Promise<string>;
}
