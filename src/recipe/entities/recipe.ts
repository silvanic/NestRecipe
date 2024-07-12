import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

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
}
