const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();
const validateEnv = require('./src/config/env');
const app = require('./src/app');
const connectDB = require('./src/config/database');

validateEnv();

const PORT = process.env.PORT || 3000;


app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});