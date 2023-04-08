import { ArticleRepository } from '../repository/article.repository';
import { IArticle } from '../@types/article';

/** export class ArticleService {
  private articleRepository: ArticleRepository;

  constructor() {
    this.articleRepository = new ArticleRepository();
  }

  async getArticles(): Promise<IArticle[]> {
    return await this.articleRepository.getArticles();
  }

  async createArticle(article: IArticle): Promise<IArticle | null> {
    return await this.articleRepository.createArticle(article);
  }

  async updateArticle(article: IArticle): Promise<IArticle | null> {
    return await this.articleRepository.updateArticle(article);
  }

  async deleteArticle(id: string): Promise<void> {
    await this.articleRepository.deleteArticle(id);
  }
}
/** */

export class ArticleService {
  private articleRepository: ArticleRepository = new ArticleRepository();

  async addArticle(article: IArticle) {
    return await this.articleRepository.addArticle(article);
  }

  async getArticles() {
    return await this.articleRepository.getArticles();
  }

  async updateArticle(id: string, article: Partial<IArticle>) {
    return await this.articleRepository.updateArticle(id, article);
  }

  async deleteArticle(id: string) {
    return await this.articleRepository.deleteArticle(id);
  }

  async getArticleByTitle(title: string): Promise<IArticle | null> {
    return await this.articleRepository.getArticleByTitle(title);
  }
}
