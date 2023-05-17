import { RechargeStatus } from '../recharge.entity';
export declare class ListRechargeDTO {
    readonly id: string;
    readonly value: number;
    readonly status: RechargeStatus;
    readonly user: {
        id: string;
        username: string;
    };
    constructor(id: string, value: number, status: RechargeStatus, user: {
        id: string;
        username: string;
    });
}
