import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from '../../entities/recipe';
import { DeleteResult, Repository } from 'typeorm';
import { RecipeDto } from '../../dto/RecipeDto';
import { AuthorService } from '../author/author.service';
import { Author } from '../../entities/author';

@Injectable()
export class RecipeService extends Repository<Recipe> {
  @Inject(AuthorService)
  private authorRepository: Repository<Author>;

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

  async deleteById(id: number): Promise<DeleteResult> {
    return await this.recipeRepository.delete(id);
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

  async getRecipesByAuthor(id: number): Promise<Recipe[]> {
    return this.recipeRepository.findBy({ author: { id } });
  }

  async getIngredients(): Promise<string[]> {
    // const result = await this.recipeRepository.query(
    //   'SELECT array_agg(DISTINCT ingredient) as ingredients FROM recipe, UNNEST(ingredients) AS ingredient',
    // );

    const result = await this.recipeRepository
      .createQueryBuilder()
      .select('array_agg(DISTINCT ingredient)', 'ingredients')
      .addFrom((qb) => {
        return qb
          .select('UNNEST(recipe.ingredients)', 'ingredient')
          .from(Recipe, 'recipe');
      }, 'ingredients_subquery')
      .getRawOne();

    return result.ingredients;
  }
}
