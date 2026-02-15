const express = require('express');
const router = express.Router();
const { createArticle, getArticles, getArticleById, updateArticle, deleteArticle, searchArticles } = require('../controllers/article.c');
const { validateArticle, validateArticleUpdate } = require('../middlewares/validation.m');
const requireAuth = require('../middlewares/requireauth');

router.post('/articles', validateArticle, requireAuth, createArticle)

router.get('/articles', requireAuth, getArticles)

router.get('/articles/search', requireAuth, searchArticles)

router.get('/articles/:id', requireAuth, getArticleById)

router.put('/articles/:id', validateArticleUpdate, requireAuth, updateArticle)

router.delete('/articles/:id', requireAuth, deleteArticle)

module.exports = router;