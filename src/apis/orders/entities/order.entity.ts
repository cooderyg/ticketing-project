import { User } from 'src/apis/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Concert } from 'src/apis/concerts/entities/concert.entity';

export enum ORDERSTATUS {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ORDERSTATUS, default: ORDERSTATUS.PAYMENT })
  status: ORDERSTATUS;

  @Column()
  amount: number;

  @Column({ type: 'simple-json' })
  seatInfos: { seatId: string; grade: string; seatNum: number }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => User, //
    (user) => user.orders,
    { onDelete: 'CASCADE' },
  )
  user: User;

  @ManyToOne(
    () => Concert, //
    (concert) => concert.orders,
  )
  concert: Concert;
}
