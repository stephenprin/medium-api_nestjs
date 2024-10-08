import { UserEntity } from '@app/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'articles' })
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;
  @Column()
  title: string;
  @Column({ default: '' })
  description: string;
  @Column({ default: '' })
  body: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @Column('simple-array')
  tagList: Array<string>;
  @Column({ default: 0 })
  favouriteCount: number;
  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
  @ManyToOne(() => UserEntity, (user) => user.articles, { eager: true })
  author: UserEntity;
}
