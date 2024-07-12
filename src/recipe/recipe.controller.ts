import { RecipeDto } from '../dto/RecipeDto';
import { Recipe } from '../entities/recipe';
import { RecipeService } from './recipe.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Post()
  async createRecipe(@Body() recipe: RecipeDto): Promise<Recipe> {
    return this.recipeService.save(recipe);
  }

  @Get(':id')
  getRecipe(@Param('id') id: number): Promise<Recipe | null> {
    return this.recipeService.findById(id);
  }

  @Get()
  getAllRecipe(): Promise<Recipe[]> {
    return this.recipeService.find();
  }

  @Delete(':id')
  deleteRecipe(@Param('id') id: number) {
    return this.recipeService.deleteById(id);
  }

  @Patch(':id')
  updateRecipe(@Param('id') id: number, @Body() recipe: RecipeDto) {
    return this.recipeService.updateById(id, recipe);
  }
}
