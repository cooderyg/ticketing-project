import { Category } from 'src/apis/categories/entities/category.entity';
import { Order } from 'src/apis/orders/entities/order.entity';
import { Seat } from 'src/apis/seats/entities/seat.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// enum ORDERSTATE {
//   ONSALE = 'ONSALE',
//   ORDERWAIT = 'ORDERWAIT',
//   SOLDOUT = 'SOLDOUT',
// }

// interface seats {
//   grade: string;
//   seatNum: number;
//   orderStatus: ORDERSTATE;
// }

@Entity()
export class Concert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @Column()
  address: string;

  @Column({ type: 'date' })
  concertDate: Date;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(
    () => Category, //
    (category) => category.concerts,
    { onDelete: 'CASCADE' },
  )
  category: Category;

  @ManyToOne(
    () => User, //
    (user) => user.concerts,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  user: User;

  @OneToMany(
    () => Seat, //
    (seat) => seat.concert,
    { cascade: true },
  )
  seats: Seat[];

  @OneToMany(
    () => Order, //
    (order) => order.concert,
    { cascade: true },
  )
  orders: Order[];
}
