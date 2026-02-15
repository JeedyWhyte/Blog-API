const Joi = require('joi');

const articleValidationSchema = Joi.object({
    title: Joi.string().min(5).max(150).required(),
    content: Joi.string().min(20).required()
});

const validateArticle = (req, res, next) => {
    const { error } = articleValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const updateArticleValidationSchema = Joi.object({
    title: Joi.string().min(5).max(150).optional(),
    content: Joi.string().min(20).optional()
}).or('title', 'content'); // At least one field must be provided

const validateArticleUpdate = (req, res, next) => {
    const { error } = updateArticleValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

module.exports = {
    validateArticle,
    validateArticleUpdate
};