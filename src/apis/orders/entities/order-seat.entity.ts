import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Order } from './order.entity';
import { Seat } from 'src/apis/seats/entities/seat.entity';

@Entity()
export class OrderSeat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => Order, //
    (order) => order.orderSeats,
    { onDelete: 'CASCADE' },
  )
  order: Order;

  @ManyToOne(() => Seat, (seat) => seat.orderSeats)
  seat: Seat;
}
