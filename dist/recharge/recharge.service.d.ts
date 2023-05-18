import { Repository } from 'typeorm';
import { RechargeEntity } from './recharge.entity';
import { UserService } from 'src/user/user.service';
import { CreateRechargeDto } from './dto/CreateRecharge.dto';
import { ListRechargeDTO } from './dto/ListRecharge.dto';
export declare class RechargeService {
    private readonly rechargeRepository;
    private userService;
    constructor(rechargeRepository: Repository<RechargeEntity>, userService: UserService);
    findAllRecharges(): Promise<ListRechargeDTO[]>;
    findOneRechargeById(rechargeId: string, userRoles: string, userId: string): Promise<string>;
    createRecharge(data: CreateRechargeDto): Promise<string>;
    payRecharge(rechargeId: string, userId: string, userRoles: string): Promise<boolean>;
}
