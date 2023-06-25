import { getArticles, postArticles, getArticlesId, putArticles, deleteArticles } from '../controllers/controller.js';
import express from 'express';

const Router = express.Router();

Router.get('/articles', getArticles);
Router.post('/articles', postArticles);
Router.get('/articles/:id', getArticlesId);
Router.put('/articles/:id', putArticles);
Router.delete('/articles/:id', deleteArticles);


export default Router;
