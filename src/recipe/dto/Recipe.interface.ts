import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';

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
}