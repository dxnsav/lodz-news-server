import { ArticleRepository } from '../repository/article.repository';

export class ArticleService {
  private articleRepository: ArticleRepository;

  constructor() {
    this.articleRepository = new ArticleRepository();
  }

  async getArticles() {
    return await this.articleRepository.getArticles();
  }

  async createArticle(article) {
    return await this.articleRepository.createArticle(article);
  }

  async updateArticle(article) {
    return await this.articleRepository.updateArticle(article);
  }

  async deleteArticle(id) {
    return await this.articleRepository.deleteArticle(id);
  }
}
