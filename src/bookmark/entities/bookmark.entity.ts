import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  link: string;

  @ManyToOne((type) => User, (user) => user.bookMarks, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
