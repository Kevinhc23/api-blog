import { getArticles, postArticles, getArticlesId, putArticles, deleteArticles, postUser, getUsers } from '../controllers/controller.js';
import express from 'express';


const Router = express.Router();



Router.get('/articles', getArticles);
Router.post('/articles', postArticles);
Router.get('/articles/:id', getArticlesId);
Router.put('/articles/:id', putArticles);
Router.delete('/articles/:id', deleteArticles);
Router.post('/user', postUser);
Router.get('/user', getUsers);


export default Router;
