import { RecipeDto } from './dto/Recipe.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class RecipeService extends Repository<Recipe> {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {
    super(
      recipeRepository.target,
      recipeRepository.manager,
      recipeRepository.queryRunner,
    );
  }

  deleteById(id: number): Promise<DeleteResult> {
    return this.recipeRepository.delete(id);
  }

  findById(id: number): Promise<Recipe | null> {
    return this.recipeRepository.findOneBy({ id });
  }

  clean() {
    this.recipeRepository.createQueryBuilder().delete().where('id is not null');
  }

  updateById(id: number, recipe: RecipeDto) {
    return this.recipeRepository.save({ ...recipe, id });
  }
}
