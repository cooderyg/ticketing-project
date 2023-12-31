import { Concert } from 'src/apis/concerts/entities/concert.entity';

import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
}
