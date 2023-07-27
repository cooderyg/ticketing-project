import { Concert } from 'src/apis/concert/entities/concert.entity';
import { OrderSeat } from 'src/apis/orders/entities/order-seat.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  seatNum: number;

  @Column()
  grade: string;

  @Column()
  price: number;

  @Column({ default: false })
  isSoldOut: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => Concert, //
    (concert) => concert.seats,
    { onDelete: 'CASCADE' },
  )
  concert: Concert;

  @OneToMany(
    () => OrderSeat, //
    (orderSeat) => orderSeat.order,
  )
  orderSeats: OrderSeat[];
}
