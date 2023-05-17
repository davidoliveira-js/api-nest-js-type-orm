import { RechargeStatus } from 'src/recharge/recharge.entity';

export class ListUserDto {
  constructor(
    readonly id: string,
    readonly username: string,
    readonly email: string,
    readonly credits: number,
    readonly acquisitions:
      | {
          id: string;
          price: number;
          giftCard: { id: string; name: string; pin: string };
        }[],
    readonly recharges: {
      id: string;
      value: number;
      status: RechargeStatus;
    }[]
  ) {}
}
