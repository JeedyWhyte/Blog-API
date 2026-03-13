const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/user.c');
const { validateSignup, validateLogin } = require('../middlewares/validate.u.m');

const upload = require('../middlewares/uploads');

router.post('/upload', upload.single('image'), (req, res) => {
    const fileURL = req.file.path;
    const fileName = req.file.originalname;

    console.log(fileName, fileURL);

    res.json({message: 'File uploaded successfully'});
});

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);

module.exports = router;