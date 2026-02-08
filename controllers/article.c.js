const Article = require('../model/article.m');
const joi = require('joi');

const createArticle = async (req, res, next) => {
    const schema = joi.object({
        title: joi.string().min(5).required(),
        content: joi.string().min(20).required(),
        author: joi.string().default('Anonymous')
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const { title, content, author } = req.body;
        const article = new Article({ title, content, author });
        await article.save();
        res.status(201).json({ message: 'Article created successfully', article });
    } catch (error) {
        res.status(500).json({ message: 'Error creating article', error: error.message });
        next(error);
    }
};

const getArticles = async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    try {
        const articles = await Article.find().skip(skip).limit(parseInt(limit)).sort({ createdAt: -1 });
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error: error.message });
        next(error);
    }
};

const getArticleById = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching article', error: error.message });
        next(error);
    }
};

const updateArticle = async (req, res, next) => {
    try {
        const { title, content, author } = req.body;
        const schema = joi.object({
            title: joi.string().min(5),
            content: joi.string().min(20),
            author: joi.string()
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const article = await Article.findByIdAndUpdate(
            req.params.id,
            { title, content, author },
            { new: true }
        );
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json({ message: 'Article updated successfully', article });
    } catch (error) {
        res.status(500).json({ message: 'Error updating article', error: error.message });
        next(error);
    }
};

const deleteArticle = async (req, res, next) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting article', error: error.message });
        next(error);
    }
};

const searchArticles = async (req, res, next) => {
    const { q } = req.query;
    try {
        const articles = await Article.find({ $text: { $search: q } });
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Error searching articles', error: error.message });
        next(error);
    }
};

module.exports = {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
    searchArticles
};
