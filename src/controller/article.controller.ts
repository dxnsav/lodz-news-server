import { IArticle } from '../@types/article.d';
import { ArticleService } from '../service/article.service';

export class ArticleController {
  private articleService: ArticleService = new ArticleService();

  async addArticle(article: IArticle) {
    return await this.articleService.addArticle(article);
  }

  async getArticles() {
    return await this.articleService.getArticles();
  }

  async updateArticle(id: string, article: Partial<IArticle>) {
    return await this.articleService.updateArticle(id, article);
  }

  async deleteArticle(id: string) {
    return await this.articleService.deleteArticle(id);
  }

  async checkArticleExists(title: string): Promise<boolean> {
    const article = await this.articleService.getArticleByTitle(title);
    return !!article;
  }
}
