import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  body: string;

  @Column('int')
  userId: number;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
