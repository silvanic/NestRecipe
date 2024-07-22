import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../../entities/author';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService extends Repository<Author> {
  constructor(@InjectRepository(Author) authorRepository: Repository<Author>) {
    super(
      authorRepository.target,
      authorRepository.manager,
      authorRepository.queryRunner,
    );
  }
}
