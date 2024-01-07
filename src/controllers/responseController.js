// error for all
const errorResponse = (res, {statusCode = 500, message="Internar server error"}) =>{
    return res.status(statusCode).json({
        success: false,
        message: message
    })
}
// success message
const successResponse = (res, {statusCode = 200, message="Success", payload={}}) =>{
    return res.status(statusCode).json({
        success: true,
        message: message,
        payload,
    })
}

module.exports = {errorResponse,successResponse}