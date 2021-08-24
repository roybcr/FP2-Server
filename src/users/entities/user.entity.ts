import {
  Column,
  Entity,
  Index,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { Todo } from '../../todos/entities/todo.entity';

@Entity()
export class User {
  // This will auto generate an auto incrementing ID.
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Index()
  @Column('text', { unique: true })
  email: string;

  @Column('text', { nullable: true })
  city?: string;

  @Column('text', { nullable: true })
  street?: string;

  @Column('text', { nullable: true })
  zipcode?: string;

  // In TypeORM you can specify the relations between two entities using decorators such as @OneToMany
  @OneToMany(() => Todo, (todos) => todos.user, { cascade: true })
  @JoinTable()
  todos: Todo[];

  @OneToMany(() => Post, (posts) => posts.user, { cascade: true })
  @JoinTable()
  posts: Post[];
}
