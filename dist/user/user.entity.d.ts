import { AcquisitionEntity } from 'src/acquisitions/acquisition.entity';
import { RechargeEntity } from 'src/recharge/recharge.entity';
export declare class UserEntity {
    id: string;
    username: string;
    email: string;
    password: string;
    credits: number;
    role: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    acquisitions: AcquisitionEntity[];
    recharges: RechargeEntity[];
}
