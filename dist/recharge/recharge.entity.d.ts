import { UserEntity } from 'src/user/user.entity';
export declare const enum RechargeStatus {
    Pending = "pending",
    Expired = "expired",
    Payd = "payd"
}
export declare class RechargeEntity {
    id: string;
    value: number;
    status: RechargeStatus;
    user: UserEntity;
}
