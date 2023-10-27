import { ApiProperty } from '@nestjs/swagger';
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

export enum AGEKLIMIT {
  ZERO = 'ZERO',
  SEVEN = 'SEVEN',
  FIFTEEN = 'FIFTEEN',
  NINETEEN = 'NINETEEN',
}

@Entity()
export class Concert {
  @ApiProperty({ example: 'uuid', required: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '싸이의 흠뻑쑈', required: true, description: '공연이름' })
  @Column()
  name: string;

  @ApiProperty({ example: '싸이 흠뻑쇼 SUMMER SWAG 2023', required: true, description: '공연설명' })
  @Column()
  description: string;

  @ApiProperty({ example: 'image/url', required: true, description: '이미지주소' })
  @Column()
  imageUrl: string;

  @ApiProperty({ example: '서울특별시 중구 세종대왕로 10번길', required: true, description: '공연장소(주소)' })
  @Column()
  address: string;

  @ApiProperty({ example: 100, required: true, description: '상영시간' })
  runningTime: number;

  @ApiProperty({ example: 'SEVEN', description: '제한 연령', required: true })
  @Column({ type: 'enum', enum: AGEKLIMIT })
  ageLimit: AGEKLIMIT;

  @ApiProperty({ example: '2023-07-28T21:48:33.615Z', required: true, description: '콘서트날짜' })
  @Column({ type: 'date' })
  concertDate: Date;

  @ApiProperty({ example: '2023-07-28T21:48:33.615Z', required: true, description: '예매시작날짜' })
  @Column({ type: 'date' })
  startDate: Date;

  @ApiProperty({ example: '2023-07-28T21:48:33.615Z', required: true, description: '예매종료날짜' })
  @Column({ type: 'date' })
  endDate: Date;

  @ApiProperty({ example: '2023-07-28T21:48:33.615Z', required: true, description: '콘서트데이터 생성날짜' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2023-07-28T21:48:33.615Z', required: true, description: '콘서트데이터 수정날짜' })
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
