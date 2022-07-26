const { StatusCodes } = require('http-status-codes');


const globalErrorHandler = (err, req, res, next) => {
    let error = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong try again ',
        origin: err.origin || 'unknown'
    }
    res.status(error.statusCode).json({
        status:false,
        origin: error.origin,
        message: error.message
    });
}




module.exports = globalErrorHandler;