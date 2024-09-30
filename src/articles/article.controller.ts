import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard } from '@app/guards/auth.guard';
import { User } from '@app/decorators/user.decorator';
import { CreateArticlesDto } from '@app/dto/createArticles.dto';
import { UserEntity } from '@app/user/user.entity';
import { ArticlesResponseInterface } from '@app/types/ArticlesResponseInterface.interface';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createArticle(
    @User() currentUser: UserEntity,
    @Body('article') createArticlesDto: CreateArticlesDto,
  ): Promise<any> {
    return await this.articleService.createArticle(
      currentUser,
      createArticlesDto,
    );
  }
}
