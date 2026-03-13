const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(cors('*'));

app.use(logger);

// Mount user routes before the generic /api router so /api/user/*
// requests don't get intercepted by the protected /api router.
app.use('/api/user', require('./routes/user.r'));
app.use('/api', require('./routes/article.r'));

app.use(errorHandler)

module.exports = app;