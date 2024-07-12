import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe';
import { DataSource } from 'typeorm';
import { RecipeModule } from './recipe/recipe.module';
import { AuthorModule } from './author/author.module';
import { Author } from './entities/author';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'kitchen',
      entities: [Recipe, Author],
      synchronize: true,
    }),
    RecipeModule,
    AuthorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private datasource: DataSource) {}
}
