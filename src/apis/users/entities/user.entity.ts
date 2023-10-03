import { ApiProperty } from '@nestjs/swagger';
import { RefreshToken } from 'src/apis/auth/entities/refresh-token.entity';
import { Concert } from 'src/apis/concerts/entities/concert.entity';
import { Order } from 'src/apis/orders/entities/order.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum ROLE {
  USER = 'USER',
  HOST = 'HOST',
  ADMIN = 'ADMIN',
}

@Entity()
export class User {
  @ApiProperty({ required: true, example: 'uuidglknj12msfgjln123s', type: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ required: true, example: 'hello@gmail.com', type: 'string' })
  @Column()
  email: string;

  @ApiProperty({ required: true, example: 'superman', type: 'string' })
  @Column()
  nickname: string;

  @ApiProperty({ required: true, example: 'Password2839', type: 'string' })
  @Column()
  password: string;

  @ApiProperty({ required: false, example: 1000000, type: 'number' })
  @Column({ default: 1000000 })
  point: number;

  @ApiProperty({ required: false, example: 'USER', enum: ROLE })
  @Column({ type: 'enum', enum: ROLE, default: ROLE.USER })
  role: ROLE;

  @ApiProperty({ nullable: true, example: 'imageurl.png' })
  @Column({ nullable: true })
  profileImageUrl: string;

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

  @OneToOne(
    () => RefreshToken, //
    (refreshToken) => refreshToken.user,
    { cascade: true },
  )
  refreshToken: string;
}
