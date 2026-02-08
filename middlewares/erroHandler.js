const errorhandler = (err, req, res, next) => {
    console.error(err.message)
    console.error(err.stack || '');
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ message: 'Internal Server Error', error: err.message });
}

module.exports = errorhandler;