import { Concert } from 'src/apis/concert/entities/concert.entity';
import { Order } from 'src/apis/orders/entities/order.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum ROLE {
  USER = 'USER',
  HOST = 'HOST',
  ADMIN = 'ADMIN',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column({ default: 1000000 })
  point: number;

  @Column({ type: 'enum', enum: ROLE, default: ROLE.USER })
  role: ROLE;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => Concert, //
    (consert) => consert.user,
    { cascade: true },
  )
  concerts: Concert[];

  @OneToMany(
    () => Order, //
    (order) => order.user,
    { cascade: true },
  )
  orders: Order[];
}
