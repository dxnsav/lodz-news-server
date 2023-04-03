import bodyParser from 'body-parser';
import express from 'express';
import { APILogger } from './logger/api.logger';
import { ArticleController } from './controller/article.controller.ts';

class App {
  public express: express.Application;
  public logger: APILogger;
  public articleController: ArticleController;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.logger = new APILogger();
    this.articleController = new ArticleController();
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.express.get('/api/v1/articles', (req, res) => {
      this.articleController.getArticles().then(data => res.json(data));
    });

    this.express.post('/api/v1/article', (req, res) => {
      console.log('req.body :::', req.body);
      this.articleController.createArticle(req.body.article).then(data => res.json(data));
    });

    this.express.put('/api/v1/article', (req, res) => {
      this.articleController.updateArticle(req.body.article).then(data => res.json(data));
    });

    this.express.put('/api/v1/article/:id', (req, res) => {
      this.articleController.deleteArticle(req.params.id).then(data => res.json(data));
    });

    this.express.get('/', (req, res) => {
      res.send('Start');
    });

    // handle undefined routes
    this.express.use('*', (req, res) => {
      res.send('Invalid route');
    });
  }
}

export default new App().express;
