const errorResponse = (res, {statusCode = 500, message="Internar server error"}) =>{
    return res.status(statusCode).json({
        success: false,
        message: message
    })
}

module.exports = {errorResponse}