import { ArticleModel } from '../models/article.model';
import { IArticle } from '../@types/article';

export class ArticleRepository {
  async addArticle(article: IArticle) {
    return await ArticleModel.create(article);
  }

  async getArticles() {
    return await ArticleModel.find();
  }

  async updateArticle(id: string, article: Partial<IArticle>) {
    return await ArticleModel.findByIdAndUpdate(id, article, { new: true });
  }

  async deleteArticle(id: string) {
    return await ArticleModel.findByIdAndDelete(id);
  }

  async getArticleByTitle(title: string): Promise<IArticle | null> {
    return await ArticleModel.findOne({ title });
  }
}
