import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../entities/author';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorService],
  exports: [TypeOrmModule.forFeature([Author]), AuthorService],
})
export class AuthorModule {}
