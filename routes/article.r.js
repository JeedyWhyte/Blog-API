const express = require('express');
const router = express.Router();
const { createArticle, getArticles, getArticleById, updateArticle, deleteArticle, searchArticles } = require('../controllers/article.c');

router.post('/articles', createArticle)

router.get('/articles', getArticles)

router.get('/articles/search', searchArticles)

router.get('/articles/:id', getArticleById)

router.put('/articles/:id', updateArticle)

router.delete('/articles/:id', deleteArticle)

module.exports = router;