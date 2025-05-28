import { FindAndCountOptions, Op } from 'sequelize';
import {
  Get,
  Query,
  Request,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa';

import { 
  BadRequest, 
  Request as ExpressRequest,
  InternalError,
} from '../../middleware';
import {
  Article,
  ArticleAttributes,
  PublicArticleAttributes,
} from '../../schema';
import { BaseController } from '../Controller';
import { BulkResponse } from '../types';

@Route('/v1/article')
@Tags('Article')
@Security('jwt')
@SuccessResponse('200', 'OK')
@SuccessResponse('201', 'Created')
@SuccessResponse('204', 'No Content')
@Response<BadRequest>(401, 'Unauthorized')
@Response<InternalError>(500, 'Internal Server Error')
export class ArticleController extends BaseController {
  
  @Get('/')
  public static async getArticles(
    @Request() req: ExpressRequest,
    @Query() limit = 5,
    @Query() offset = 0,
    @Query() id?: number,
    @Query() startDate?: number,
    @Query() endDate?: number
  ): Promise<BulkResponse<PublicArticleAttributes>> {
    const where: FindAndCountOptions<ArticleAttributes>['where'] = {};
    if (id) {
      where.id = id;
    } else if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt[Op.gte] = new Date(startDate);
      }
      if (endDate) {
        where.createdAt[Op.lte] = new Date(endDate);
      }
    }
    return await Article.findAndCountAll({ 
      limit, 
      offset,
      order: [['updatedAt', 'desc']],
      where,
    });
  }
  
  // @Post('/create')
  // public static async createArticle(
  //   @Request() req: ExpressRequest,
  //   @Body() body: PublicArticleCreationAttributes
  // ): Promise<PublicArticleAttributes> {
  //   const article = await Article.create({
  //     ...body,
  //   });
  //   return article;
  // }
  
  // @Delete('/')
  // public static async deleteArticle(
  //   @Request() req: ExpressRequest,
  //   @Body() body: { articleId: number }
  // ): Promise<void> {
  //   const article = await Article.findOne({ where: { id: body.articleId } });
  //   if (article.createdById !== req.jwt.user.id) {
  //     throw new BadRequest('UNAUTHORIZED');
  //   }
  //   await article.destroy();
  // }
  
}