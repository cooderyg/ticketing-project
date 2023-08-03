import { User } from 'src/apis/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Concert } from 'src/apis/concerts/entities/concert.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum ORDERSTATUS {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}

class SeatInfo {
  seatId: string;
  grade: string;
  seatNum: number;
}

@Entity()
export class Order {
  @ApiProperty({ example: 'uuid', description: '주문 ID', required: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'PAYMENT', description: '주문 상태', required: true })
  @Column({ type: 'enum', enum: ORDERSTATUS, default: ORDERSTATUS.PAYMENT })
  status: ORDERSTATUS;

  @ApiProperty({ example: 50000, description: '주문 총 금액', required: true })
  @Column()
  amount: number;

  @ApiProperty({ required: true, description: '주문좌석 정보', isArray: true, type: SeatInfo })
  @Column({ type: 'simple-json' })
  seatInfos: { seatId: string; grade: string; seatNum: number }[];

  @ApiProperty({ example: '2023-08-01T08:23:12.001Z', description: '생성일자', required: true })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2023-08-01T08:23:12.001Z', description: '수정일자', required: true })
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
