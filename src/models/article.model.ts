import { IArticle } from '../@types/article';
import { model, Schema, Model } from 'mongoose';

const ArticleSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    paragraphs: { type: [String], required: true },
    images: { type: [String], required: false },
    createdAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false },
    publishedAt: { type: Date, required: false },
    date: { type: String, required: false },
    tags: { type: [String], required: false },
    url: { type: String, required: true },
  },
  { timestamps: true },
);

ArticleSchema.set('collection', 'articlesPL');
export const ArticleModel: Model<IArticle> = model<IArticle>('ArticlesPL', ArticleSchema);
