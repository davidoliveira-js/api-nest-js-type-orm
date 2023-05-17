import { RechargeStatus } from '../recharge.entity';

export class ListRechargeDTO {
  constructor(
    readonly id: string,
    readonly value: number,
    readonly status: RechargeStatus,
    readonly user: { id: string; username: string }
  ) {}
}
