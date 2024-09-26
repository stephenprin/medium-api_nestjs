import { Controller, Get } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  createArticle(): string {
    return this.articleService.createArticle(this.article);
  }
}
