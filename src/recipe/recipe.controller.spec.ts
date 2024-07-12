import { Recipe } from '../entities/recipe';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeController } from './recipe.controller';
import { RecipeService } from '../recipe/recipe.service';
import { RecipeDto } from '../dto/RecipeDto';
import { RecipeModule } from '../recipe/recipe.module';
import { INestApplication } from '@nestjs/common';
import { Author } from '../entities/author';
import { AuthorService } from '../author/author.service';
import { AuthorModule } from '../author/author.module';

describe('Recipe', () => {
  let app: INestApplication;
  let recipeController: RecipeController;
  let recipeService: RecipeService;
  let authorService: AuthorService;

  const recipe: RecipeDto = {
    name: "Boeuf de l'or",
    description: 'Test',
    ingredients: ['test'],
    instructions: ['azer'],
    author: {
      name: 'Author',
    },
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RecipeModule,
        AuthorModule,
        // Use the e2e_test database to run the tests
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'admin',
          database: 'e2e_test',
          entities: [Recipe, Author],
          synchronize: false,
          logging: true,
        }),
      ],
    }).compile();
    app = module.createNestApplication();
    recipeController = module.get(RecipeController);
    recipeService = module.get(RecipeService);
    authorService = module.get(AuthorService);
    await app.init();
  });

  describe('Test CRUD Recipe', () => {
    let created: Recipe;
    it('should return a recipe', async () => {
      created = await recipeController.createRecipe(recipe);
      expect(created.description).toBe(recipe.description);
      expect(created.author.name).toBe(recipe.author.name);
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
      const recipe = await recipeController.getRecipe(created.id);
      expect(recipe).toBeNull();
    });
  });

  afterAll(async () => {
    recipeService.clean();
    await app.close();
  });
});
