import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RecipeModule } from './modules/recipe/recipe.module';
import { AuthorModule } from './modules/author/author.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './config/service/TypeOrmConfigService.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './env/.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      inject: [TypeOrmConfigService],
    }),
    RecipeModule,
    AuthorModule,
  ],
  controllers: [AppController],
  providers: [AppService, TypeOrmConfigService],
})
export class AppModule {
  constructor(private datasource: DataSource) {}
}
