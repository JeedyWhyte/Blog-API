const express = require('express');
const router = express.Router();
const { createArticle, getArticles, getArticleById, updateArticle, deleteArticle, searchArticles } = require('../controllers/article.c');
const { validateArticle, validateArticleUpdate } = require('../middlewares/validate.p.m');
const requireAuth = require('../middlewares/requireauth');
const upload = require('../middlewares/uploads');

router.use(requireAuth);

router.post('/articles', validateArticle, upload.array('images', 5), createArticle)

router.get('/articles', getArticles)

router.get('/articles/search', searchArticles)

router.get('/articles/:id', getArticleById)

router.put('/articles/:id', validateArticleUpdate, updateArticle)

router.delete('/articles/:id', deleteArticle)

module.exports = router;