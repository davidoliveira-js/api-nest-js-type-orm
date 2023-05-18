import { RechargeService } from './recharge.service';
import { CreateRechargeDto } from './dto/CreateRecharge.dto';
export declare class RechargeController {
    private rechargeService;
    constructor(rechargeService: RechargeService);
    getAll(): Promise<import("./dto/ListRecharge.dto").ListRechargeDTO[]>;
    getOneById(id: string, userRoles: string, req: any): Promise<string>;
    create(data: CreateRechargeDto, req: any, userRoles: string): Promise<import("../core/http/nest-response").NestResponse>;
    pay(rechargeId: string, req: any, userRoles: string): Promise<{
        id: string;
    }>;
}
