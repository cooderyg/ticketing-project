import { User } from 'src/apis/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OrderSeat } from './order-seat.entity';
import { Concert } from 'src/apis/concert/entities/concert.entity';

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

  @OneToMany(
    () => OrderSeat, //
    (orderSeat) => orderSeat.order,
    { cascade: true },
  )
  orderSeats: OrderSeat[];

  @ManyToOne(
    () => Concert, //
    (concert) => concert.orders,
  )
  concert: Concert;
}
