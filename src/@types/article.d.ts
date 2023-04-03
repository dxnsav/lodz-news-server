import { type Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  description: string;
  paragraphs: string[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  timestamps?: object;
}
