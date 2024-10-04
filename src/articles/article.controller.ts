import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard } from '@app/guards/auth.guard';
import { User } from '@app/decorators/user.decorator';
import { CreateArticlesDto } from '@app/dto/createArticles.dto';
import { UserEntity } from '@app/user/user.entity';
import { ArticleResponseInterface } from './types/ArticleResponseInterface';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createArticle(
    @User() currentUser: UserEntity,
    @Body('article') createArticlesDto: CreateArticlesDto,
  ): Promise<ArticleResponseInterface> {
    const articles = await this.articleService.createArticle(
      currentUser,
      createArticlesDto,
    );
    return this.articleService.buildArticleResponse(articles);
  }

  @Get(':slug')
  async getArticles(
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const articles = await this.articleService.findBySlug(slug);
    return this.articleService.buildArticleResponse(articles);
  }
  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteArticles(
    @Param('slug') slug: string,
    @User('id') currentUserId: number,
  ) {
    return this.articleService.deleteArticle(slug, currentUserId);
  }
  @Put(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateArticles(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
    @Body('article') updateArticleDto: CreateArticlesDto,
  ): Promise<ArticleResponseInterface> {
    const articles = await this.articleService.updateArticle(
      currentUserId,
      slug,
      updateArticleDto,
    );
    return this.articleService.buildArticleResponse(articles);
  }
}
