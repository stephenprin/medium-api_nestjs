import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard } from '@app/guards/auth.guard';
import { User } from '@app/decorators/user.decorator';
import { CreateArticlesDto } from '@app/dto/createArticles.dto';
import { UserEntity } from '@app/user/user.entity';
import { ArticleResponseInterface } from './types/articleResponse.interface';
import { ArticlesResponseInterface } from './types/articlesResponse.interface';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponseInterface> {
    return this.articleService.findAll(currentUserId, query);
  }

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
  @Post(':slug/favorite')
  @UseGuards(AuthGuard)
  async addArticleToFavorite(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const articles = await this.articleService.addArticleToFavorite(
      currentUserId,
      slug,
    );
    return this.articleService.buildArticleResponse(articles);
  }
  @Delete(':slug/favorite')
  @UseGuards(AuthGuard)
  async deleteArticleToFavorite(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const articles = await this.articleService.deleteArticleToFavorite(
      currentUserId,
      slug,
    );
    return this.articleService.buildArticleResponse(articles);
  }
}
