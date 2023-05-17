import { AcquisitionEntity } from 'src/acquisitions/acquisition.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { RechargeEntity } from 'src/recharge/recharge.entity';
// import { UniqueUserName } from './uniqueUserName';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @UniqueUserName({
  //   message: 'Este nome de usuário já está sendo utilizado.',
  // })
  @Column({ name: 'username', length: 100, nullable: false })
  username: string;

  @Column({ name: 'email', length: 70, nullable: false })
  email: string;

  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

  @Column({ name: 'credits', nullable: false })
  credits: number;

  @Column({ name: 'role', nullable: false, default: 'user' })
  role: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(
    () => AcquisitionEntity,
    (acquisition) => acquisition.user,
    {
      eager: true,
      cascade: true,
      nullable: false,
    }
  )
  acquisitions: AcquisitionEntity[];

  @OneToMany(() => RechargeEntity, (recharge) => recharge.user, {
    eager: true,
    cascade: true,
    nullable: false,
  })
  recharges: RechargeEntity[];
}
