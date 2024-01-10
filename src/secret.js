require('dotenv').config()
const serverPort = process.env.SERVER_PORT || 3002;
const mongoDB_url = process.env.MONGODN_URL;
const default_image = process.env.DEFAULT_USER_IMAGE || 'public/images/images.jpg'
const jwtActivationKey = process.env.JWT_AACTIVATION_KEY || "ndifdsnfishsihfs87yshuifhrf78e" ;

module.exports={
    serverPort,
    mongoDB_url,
    default_image,
    jwtActivationKey
}