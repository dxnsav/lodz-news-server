import { Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  description?: string | null;
  paragraphs?: string[];
  url?: string | undefined;
  images?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  date?: string | null;
  timestamps?: object;
  tags?: string[];
}
