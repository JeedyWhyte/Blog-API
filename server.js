require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/erroHandler');

connectDB();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors('*'));

app.use(logger);


app.use('/api', require('./routes/article.r'));
app.use('/api/users', require('./routes/user.r'));


app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});