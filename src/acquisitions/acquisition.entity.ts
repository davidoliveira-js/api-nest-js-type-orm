import { GiftCardEntity } from 'src/gitf-card/gifitCard.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'acquisitions' })
export class AcquisitionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'price', nullable: false })
  price: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @ManyToOne(() => UserEntity, (user) => user.acquisitions, {
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserEntity;

  @OneToOne(() => GiftCardEntity, {
    eager: true,
    cascade: true,
    nullable: false,
  })
  @JoinColumn()
  giftCard: GiftCardEntity;
}
