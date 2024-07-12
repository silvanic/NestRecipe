import { Recipe } from './entities/recipe';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { RecipeDto } from './dto/Recipe.interface';
import { RecipeModule } from './recipe.module';
import { INestApplication } from '@nestjs/common';

describe('Recipe', () => {
  let app: INestApplication;
  let recipeController: RecipeController;
  let recipeService: RecipeService;

  const recipe: RecipeDto = {
    name: "Boeuf de l'or",
    description: 'Test',
    ingredients: ['test'],
    instructions: ['azer'],
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RecipeModule,
        // Use the e2e_test database to run the tests
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'admin',
          database: 'e2e_test',
          entities: [Recipe],
          synchronize: false,
        }),
      ],
    }).compile();
    app = module.createNestApplication();
    recipeController = module.get(RecipeController);
    recipeService = module.get(RecipeService);
    await app.init();
  });

  describe('full', () => {
    let created;
    it('should return a recipe', async () => {
      created = await recipeController.createRecipe(recipe);
      expect(created.description).toBe(recipe.description);
    });
    it('should update a recipe', async () => {
      const updated = await recipeController.updateRecipe(created.id, {
        ...recipe,
        description: 'Blabla',
      });
      expect(updated.description).toBe('Blabla');
    });
    it('should be removed', async () => {
      await recipeController.deleteRecipe(created.id);
      expect(await recipeController.getRecipe(created.id)).toBeNull();
    });
  });

  afterAll(async () => {
    recipeService.clean();
    await app.close();
  });
});