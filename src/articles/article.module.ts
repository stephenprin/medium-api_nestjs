import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
