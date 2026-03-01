// src/config/env.js
require('dotenv').config();

const requiredEnvVars = [
    'MONGODB_URI',
    'PORT',
    'JWT_SECRET' // Add any other variables you use
];

const validateEnv = () => {
    const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

    if (missingVars.length > 0) {
        console.error('❌ Missing required environment variables in .env:');
        missingVars.forEach(v => console.error(`   - ${v}`));
        
        // Stop the server immediately if variables are missing
        process.exit(1); 
    }

    console.log('✅ Environment variables validated');
};

module.exports = validateEnv;