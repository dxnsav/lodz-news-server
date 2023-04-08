import { ArticleModel } from './article.model';
import { IArticle } from '../@types/article';

export async function addArticle(articleData: IArticle): Promise<IArticle> {
  try {
    const article = new ArticleModel(articleData);

    const savedArticle = await article.save();

    console.log('Article saved:', savedArticle);

    return savedArticle;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
