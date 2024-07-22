import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from './author';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_on: Date;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('text', { array: true })
  ingredients: string[];

  @Column('text', { array: true })
  instructions: string[];

  @Column({ nullable: true })
  tips: string;

  @ManyToOne(() => Author, (author) => author.recipes, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'author_id' })
  author: Author;
}
