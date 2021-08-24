import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  readonly id: number;

  @IsString()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly body: string;
}
