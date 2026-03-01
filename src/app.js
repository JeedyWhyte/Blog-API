const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');


const app = express();

app.use(express.json());
app.use(cors('*'));

app.use(logger);


app.use('/api', require('./routes/article.r'));
app.use('/api/users', require('./routes/user.r'));


app.use(errorHandler)

module.exports = app;