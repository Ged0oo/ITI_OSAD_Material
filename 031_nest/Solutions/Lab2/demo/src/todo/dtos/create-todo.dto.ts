import { IsBoolean, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsBoolean()
  completed: boolean;

  @IsString()
  description: string;
}