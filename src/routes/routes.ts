/* import { Router } from 'express';
import { getArticles, createArticle, updateArticle } from '../controller/article.controller';

const router: Router = Router();

router.get('/articles', getArticles);
router.post('/article', createArticle);
router.put('/article/:id', updateArticle);

export default router;/** */

import express from 'express';
import { ArticleController } from '../controller/article.controller';

const router = express.Router();
const articleController = new ArticleController();

router.post('/articles', async (req, res) => {
  const article = await articleController.addArticle(req.body);
  res.send(article);
});

router.get('/articles', async (req, res) => {
  const articles = await articleController.getArticles();
  res.send(articles);
});

router.put('/articles/:id', async (req, res) => {
  const article = await articleController.updateArticle(req.params.id, req.body);
  res.send(article);
});

router.delete('/articles/:id', async (req, res) => {
  const result = await articleController.deleteArticle(req.params.id);
  res.send(result);
});

export default router;
