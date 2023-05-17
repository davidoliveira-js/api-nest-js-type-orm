import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export const enum RechargeStatus {
  Pending = 'pending',
  Expired = 'expired',
  Payd = 'payd',
}

@Entity({ name: 'recharges' })
export class RechargeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'value', nullable: false })
  value: number;

  @Column({
    name: 'status',
    default: RechargeStatus.Pending,
    nullable: false,
  })
  status: RechargeStatus;

  @ManyToOne(() => UserEntity, (user) => user.recharges)
  user: UserEntity;
}
