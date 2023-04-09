import axios from 'axios';
import cheerio from 'cheerio';
import mongoose from 'mongoose';
import { dbConfig } from './config/db.config';
import { ArticleController } from './controller/article.controller';
import { IArticle } from './@types/article';
import _ from 'underscore';
import moment from 'moment';

const scrapUrl = 'https://lodz.pl/aktualnosci';
const siteUrl = 'https://lodz.pl';

export default async function scrapper() {
  try {
    await mongoose.connect(dbConfig.url);

    const response = await axios(scrapUrl);
    const html = response.data;
    const $ = cheerio.load(html);

    const articleController = new ArticleController();

    const articlesPromises = $('.articles-list')
      .find('.article-item')
      .map(async function () {
        const title = cleanText($(this).find('.article-item__title').text());

        const articleExists = await articleController.checkArticleExists(title);

        if (articleExists) {
          return;
        }

        const url = siteUrl + $(this).find('.article-item__title').find('a').attr('href');
        const image =
          siteUrl + $(this).find('figure').find('a').find('picture').find('img').attr('src');
        const description = removeWordAndEmptySpaces(
          $(this).find('p.article-item__lead').text(),
          'więcej',
        );
        const tags = $(this).find('span.article-item__category').text().trim().split(',');

        const dateText = $(this).find('meta[itemprop="datePublished"]').attr('content');
        const timeText = $(this).find('time').eq(1).text().trim();
        const date = moment.utc(`${dateText} ${timeText}`, 'DD.MM.YYYY HH:mm').valueOf();

        const tag = _.isEmpty(tags) ? null : cleanArray(tags);

        const articleData: any = {
          title,
          description: description || null,
          url,
          images: [image],
          date: date,
          tags: tag || null,
        };

        return articleController.addArticle(articleData);
      })
      .get();

    const addedArticles = await Promise.all(articlesPromises);

    const updatePromises = addedArticles.map(async article => {
      if (article) {
        console.log('Article added:', article.title);

        if (!article.url) {
          return;
        }

        await updateArticleWithParsedInnerPage(article.url, article._id);
      }
    });

    await Promise.all(updatePromises);

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
};

function cleanText(text: string): string {
  const cleanedText = text.replace(/\n|\r/g, ' ').trim();

  const regex = /\[[^\]]+\]/g;
  return cleanedText.replace(regex, '').trim();
}

function removeWordAndEmptySpaces(text: string, word: string): string {
  const regex = new RegExp(`\\s*${word}`, 'g');
  return text.replace(regex, '').trim();
}

function cleanArray(arr: string[]): string[] {
  return arr.map(item => item.replace(/\n|\r/g, ' ').trim()).filter(item => item.length > 0);
}

async function updateArticleWithParsedInnerPage(scrapUrl: string, articleId: string) {
  console.log('scrap updated:', scrapUrl);
  const response = await axios(scrapUrl);

  const html = response.data;

  const $ = cheerio.load(html);
  const paragraphs: string[] = [];
  const images: string[] = [];

  const articleController = new ArticleController();

  // parse paragraphs from article
  const paragraphsPromises = $('div.article-item__body')
    .find('p, h2')
    .each(function () {
      const element = $(this);

      if (element.parents('.articles-list-others').length) {
        return;
      }

      const text = cleanText(element.text());
      if (text) {
        paragraphs.push(text);
      }
    });

  // parse images urls from gallery
  const imagePromises = $('div.article-item__photos__info')
    .find('a')
    .map(async function (this: any) {
      const imageUrl = $(this).attr('href');
      const imageCount = getNumberFromString($(this).text());
      const href = imageUrl?.split('imgNum=1');

      if (imageCount && href) {
        for (let i = 1; i <= imageCount; i++) {
          const urlGallery = `${siteUrl}${href[0]}imgNum=${i}${href[1]}`;

          const res = await axios(urlGallery);
          const resH = res.data;
          const $parsedGallery = cheerio.load(resH);

          $parsedGallery('div.article-gallery__image__inner').map(async function (this: any) {
            const urlImage = $parsedGallery(this).find('img').attr('src');
            // console.log('urlImage', urlImage);
            if (urlImage) images.push(`${siteUrl}${urlImage}`);
          });
        }
      }
    })
    .get();

  await Promise.all(paragraphsPromises);
  await Promise.all(imagePromises);

  if (_.isEmpty(paragraphs) && _.isEmpty(images)) {
    return;
  }

  const updatedArticleData: Partial<IArticle> = {};

  if (!_.isEmpty(paragraphs)) {
    updatedArticleData.paragraphs = paragraphs;
  }

  if (!_.isEmpty(images)) {
    updatedArticleData.images = images;
  }

  const updatedArticle = await articleController.updateArticle(articleId, updatedArticleData);

  return updatedArticle;
}

function getNumberFromString(text: string): number | null {
  const match = text.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}
