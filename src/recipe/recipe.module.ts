import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from '../entities/recipe';
import { RecipeService } from './recipe.service';
import { Author } from '../entities/author';
import { AuthorModule } from '../author/author.module';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, Author]), AuthorModule],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
