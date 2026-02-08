const Article = require('../model/article.m');

const createArticle = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const article = new Article({ title, content, author });
        await article.save();
        res.status(201).json({ message: 'Article created successfully', article });
    }   catch (error) {
        res.status(500).json({ message: 'Error creating article', error: error.message });
    }
};

const getArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error: error.message });
    }
};

const getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching article', error: error.message });
    }
};

const updateArticle = async (req, res) => {
    try {
        const { title, content, author } = req.body;
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
    }
};

const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting article', error: error.message });
    }
};

module.exports = {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle
};