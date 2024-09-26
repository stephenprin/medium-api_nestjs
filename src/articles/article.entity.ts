import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate } from 'typeorm';

@Entity({ name: 'articles' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;
  @Column()
  tittle: string;
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
}
