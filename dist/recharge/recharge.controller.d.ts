import { RechargeService } from './recharge.service';
import { CreateRechargeDto } from './dto/CreateRecharge.dto';
export declare class RechargeController {
    private rechargeService;
    constructor(rechargeService: RechargeService);
    getAll(): Promise<import("./dto/ListRecharge.dto").ListRechargeDTO[]>;
    getOneById(id: string): Promise<import("./dto/ListRecharge.dto").ListRechargeDTO>;
    create(data: CreateRechargeDto): Promise<import("../core/http/nest-response").NestResponse>;
    pay(rechargeId: string): Promise<void>;
}
