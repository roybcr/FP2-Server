import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column({ type: 'bool', default: false })
  completed: boolean;

  @Column('int')
  userId: number;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
