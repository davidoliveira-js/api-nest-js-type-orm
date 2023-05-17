import { RechargeStatus } from 'src/recharge/recharge.entity';
export declare class ListUserDto {
    readonly id: string;
    readonly username: string;
    readonly email: string;
    readonly credits: number;
    readonly acquisitions: {
        id: string;
        price: number;
        giftCard: {
            id: string;
            name: string;
            pin: string;
        };
    }[];
    readonly recharges: {
        id: string;
        value: number;
        status: RechargeStatus;
    }[];
    constructor(id: string, username: string, email: string, credits: number, acquisitions: {
        id: string;
        price: number;
        giftCard: {
            id: string;
            name: string;
            pin: string;
        };
    }[], recharges: {
        id: string;
        value: number;
        status: RechargeStatus;
    }[]);
}
