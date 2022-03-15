import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Pagination } from './dto/pagination.dto';
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

  async findAll({ limit, offset }: Pagination) {
    return await this.bookMarkRepository.find({
      relations: ['user'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    try {
      return await this.bookMarkRepository.findOne(id, { relations: ['user'] });
    } catch (error) {
      Logger.error(`Could not find user with IDs: ${id}`, 'BookMarkService');
      throw new HttpException(
        `User with id: ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: string, updateBookmartDto: UpdateBookmarkDto) {
    try {
      const update = await this.bookMarkRepository.preload({
        id,
        ...updateBookmartDto,
      });
      return await this.bookMarkRepository.save(update);
    } catch (error) {
      throw new NotFoundException(`Bookmark with id:  ${id} does not exist`);
    }
  }

  async remove(id: number) {
    try {
      const { affected } = await this.bookMarkRepository.delete(id);
      if (affected) {
        return { message: `Bookmark with ${id} removed successfully` };
      }
    } catch (error) {
      throw new NotFoundException(`Bookmark with id: ${id} does not exist`);
    }
  }
}
