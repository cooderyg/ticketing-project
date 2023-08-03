import { ApiProperty } from '@nestjs/swagger';
import { Concert } from 'src/apis/concerts/entities/concert.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Category {
  @ApiProperty({ required: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '뮤지컬', required: true })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: '2023-07-28T21:48:33.615Z', required: true, description: '카테고리 생성날짜' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2023-07-28T21:48:33.615Z', required: true, description: '카테고리 수정날짜' })
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => Concert,
    (concert) => concert.category, //
    { cascade: true },
  )
  concerts: Concert[];
}
