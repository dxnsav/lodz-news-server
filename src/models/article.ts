import { IArticle } from '../@types/article';
import { model, Schema } from 'mongoose';

const ArticleSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    paragraphs: { type: [String], required: true },
    images: { type: [String], required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export const ArticleModel: Model<IArticle> = model<IArticle>('News', ArticleSchema);
