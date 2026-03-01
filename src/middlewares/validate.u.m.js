const joi = require('joi');

const signupSchema = joi.object({
    name: joi.string().min(3).required(),
    username: joi.string().min(3).optional(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});

const validateSignup = (req, res, next) => {
    const { error } = signupSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

module.exports = { validateSignup, validateLogin };