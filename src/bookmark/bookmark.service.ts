import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { Bookmark } from './entities/bookmark.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookMarkRepository: Repository<Bookmark>,
  ) {}

  async create(createBookmarkDto: CreateBookmarkDto) {
    const newBookMark = await this.bookMarkRepository.create(createBookmarkDto);
    return await this.bookMarkRepository.save(newBookMark);
  }

  async findAll() {
    return await this.bookMarkRepository.find();
  }

  async findOne(id: number) {
    return await this.bookMarkRepository.findOne(id);
  }

  async update(id: string, updateBookmartDto: UpdateBookmarkDto) {
    const update = await this.bookMarkRepository.preload({
      id,
      ...updateBookmartDto,
    });

    return await this.bookMarkRepository.save(update);
  }

  async remove(id: number) {
    const { affected } = await this.bookMarkRepository.delete(id);
    if (affected) {
      return { message: `user with ${id} removed successfully` };
    }
  }
}
