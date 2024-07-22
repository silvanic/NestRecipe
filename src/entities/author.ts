import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from './recipe';
@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Recipe, (recipe) => recipe.author)
  recipes: Recipe[];
}
