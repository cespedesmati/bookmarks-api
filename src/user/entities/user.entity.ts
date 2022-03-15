import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Bookmark } from 'src/bookmark/entities/bookmark.entity';

@Entity()
@Unique('my_unique_User', ['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column() //{nullable: false}
  password: string;

  @OneToMany((type) => Bookmark, (bookmark) => bookmark.user)
  bookMarks: Bookmark[];
}
