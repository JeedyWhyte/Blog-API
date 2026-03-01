const User = require('../model/user.m');
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { hashPassword } = require('../utils/bcrypt');

const signup = async (req, res, next) => {
    try {
        const { name, username, email, password } = req.body;
        await hashPassword(password)

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or username already exists' });
        }
        const newUser = new User({
            name,
            username,
            email: email.toLowerCase(),
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const dispaly = { 
            id : user._id,
            name: user.name,
            username: user.username,
            email: user.email
        }
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return res.json({ token, dispaly });
    } catch (error) {
        next(error);
    }
}

module.exports = { signup, login };