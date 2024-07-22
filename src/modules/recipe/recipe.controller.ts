import { TestGuard } from '../../guards/test.guard';
import { RecipeDto } from '../../dto/RecipeDto';
import { Recipe } from '../../entities/recipe';
import { RecipeService } from './recipe.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

@Controller('recipe')
@UseGuards(TestGuard)
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get('ingredients')
  getIngredients(): Promise<string[]> {
    return this.recipeService.getIngredients();
  }

  @Get('author/:id')
  getRecipesByAuthor(@Param('id', ParseIntPipe) id: number): Promise<Recipe[]> {
    return this.recipeService.getRecipesByAuthor(id);
  }

  @Post()
  async createRecipe(@Body() recipe: RecipeDto): Promise<Recipe> {
    return this.recipeService.save(recipe);
  }

  @Get()
  getAllRecipe(): Promise<Recipe[]> {
    return this.recipeService.find();
  }

  @Get(':id')
  getRecipe(@Param('id', ParseIntPipe) id: number): Promise<Recipe | null> {
    return this.recipeService.findById(id);
  }

  @Delete(':id')
  deleteRecipe(@Param('id', ParseIntPipe) id: number) {
    return this.recipeService.deleteById(id);
  }

  @Patch(':id')
  updateRecipe(
    @Param('id', ParseIntPipe) id: number,
    @Body() recipe: RecipeDto,
  ) {
    return this.recipeService.updateById(id, recipe);
  }
}
