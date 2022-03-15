import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { Pagination } from './dto/pagination.dto';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  create(@Body() createBookmarkDto: CreateBookmarkDto) {
    const newBookMark = this.bookmarkService.create(createBookmarkDto);
    return newBookMark;
  }

  @Get()
  findAll(@Query() paginationOption: Pagination) {
    return this.bookmarkService.findAll(paginationOption);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookmarkService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
  ) {
    return this.bookmarkService.update(id, updateBookmarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookmarkService.remove(+id);
  }
}
