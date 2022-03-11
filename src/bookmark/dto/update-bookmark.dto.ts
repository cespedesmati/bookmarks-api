import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateBookmarkDto } from './create-bookmark.dto';

export class UpdateBookmarkDto extends PartialType(CreateBookmarkDto) {
  @IsOptional()
  title: string;

  @IsOptional()
  link: string;
}
