import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from '../entities/recipe';
import { DeleteResult, Repository } from 'typeorm';
import { RecipeDto } from '../dto/RecipeDto';
import { AuthorService } from '../author/author.service';
import { Author } from '../entities/author';

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
}
