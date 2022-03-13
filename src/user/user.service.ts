import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find({ select: ['id', 'email'] });
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      //ver si es mas practico validar por @ en controller
      throw new HttpException(
        `Invalid syntax for id: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id: ${id} does not exist`);
    }
    return user;
  }

  async findOneByMail(emailUser: string) {
    try {
      return await this.userRepository.findOne({
        where: [{ email: emailUser }],
      });
    } catch (error) {
      throw new NotFoundException(
        `User with email: ${emailUser} does not exist`,
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updateUser = await this.userRepository.preload({
        id,
        ...updateUserDto,
      });
      return await this.userRepository.save(updateUser);
    } catch (error) {
      throw new NotFoundException(`User with id:  ${id} does not exist`);
    }
  }

  async remove(id: string) {
    try {
      const { affected } = await this.userRepository.delete(id);
      if (affected) {
        return { message: `User with ${id} removed successfully` };
      }
    } catch (error) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
  }
}
