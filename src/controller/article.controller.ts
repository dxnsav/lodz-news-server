import { APILogger } from '../logger/api.logger';
import { ArticleService } from '../service/article.service';

export class ArticleController {
  private articleService: ArticleService;
  private logger: APILogger;

  constructor() {
    this.articleService = new ArticleService();
    this.logger = new APILogger();
  }

  async getArticles() {
    this.logger.info('Controller: getArticles', null);
    return await this.articleService.getArticles();
  }

  async createArticle(article) {
    this.logger.info('Controller: createArticle', article);
    return await this.articleService.createArticle(article);
  }

  async updateArticle(article) {
    this.logger.info('Controller: updateArticle', article);
    return await this.articleService.updateArticle(article);
  }

  async deleteArticle(id) {
    this.logger.info('Controller: deleteArticle', id);
    return await this.articleService.deleteArticle(id);
  }
}
