import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @OneToOne(
    () => User, //
    (user) => user.refreshToken,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  user: User;
}
