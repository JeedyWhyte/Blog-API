const multer = require('multer'); 

const errorhandler = (err, req, res, next) => {
    console.error(err.message)
    console.error(err.stack || '');
    const statusCode = err.statusCode || 500;

    if(err instanceof multer.MulterError) {
        res.status(400).json({ message: 'File upload error', error: err.message });
        return;
    }

    res.status(statusCode).json({ message: 'Internal Server Error', error: err.message });
}

module.exports = errorhandler;