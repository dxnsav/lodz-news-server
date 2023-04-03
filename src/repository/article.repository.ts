import { connect } from 'mongoose';
import { ArticleModel } from '../models/article';
import { APILogger } from '../logger/api.logger';

export class ArticleRepository {
  private logger: APILogger;

  constructor() {
    connect();
    this.logger = new APILogger();
  }

  async getArticles() {
    const articles = await ArticleModel.find({});

    console.log('articles:::', articles);
    return articles;
  }

  async createArticle(article) {
    let data = {};
    try {
      data = await ArticleModel.create(article);
    } catch (error) {
      this.logger.error('Repository: createArticle', error);
    }
    return data;
  }

  async updateArticle(article) {
    let data = {};
    try {
      data = await ArticleModel.updateOne(article);
    } catch (error) {
      this.logger.error('Repository: updateArticle', error);
    }
    return data;
  }

  async deleteArticle(id) {
    let data: any = {};
    try {
      data = await ArticleModel.deleteOne({ _id: id });
    } catch (error) {
      this.logger.error('Repository: deleteArticle', error);
    }
    return { status: `${data.deletedCount > 0 ? true : false}` };
  }
}
