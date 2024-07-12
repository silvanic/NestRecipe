import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';
import { AuthorDto } from './AuthorDto';

export class RecipeDto {
  @IsNotEmpty()
  name: string;

  description?: string;

  @IsArray()
  @ArrayMinSize(1)
  ingredients: string[];

  @IsArray()
  @ArrayMinSize(1)
  instructions: string[];

  tips?: string;

  author?: AuthorDto;
}
