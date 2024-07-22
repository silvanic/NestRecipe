import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Author } from '../../entities/author';
import { Recipe } from '../../entities/recipe';

enum OrmConfig {
  HOST = 'DATABASE_HOST',
  PORT = 'DATABASE_PORT',
  USER = 'DATABASE_USER',
  PASSWORD = 'DATABASE_PASSWORD',
  NAME = 'DATABASE_Name',
}

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get(OrmConfig.HOST),
      port: this.configService.get(OrmConfig.PORT),
      username: this.configService.get(OrmConfig.USER),
      password: this.configService.get(OrmConfig.PASSWORD),
      database: this.configService.get(OrmConfig.NAME),
      entities: [Recipe, Author],
      synchronize: true,
    };
  }
}
