require('dotenv').config()
const serverPort = process.env.SERVER_PORT || 3002;
const mongoDB_url = process.env.MONGODN_URL;

module.exports={
    serverPort,
    mongoDB_url
}