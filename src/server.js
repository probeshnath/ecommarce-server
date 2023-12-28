const app = require("./app")
const connectionDB = require("./config/db")
const { serverPort } = require("./secret")



app.listen( serverPort, async () => {
    console.log(` server is runing at http://localhost:${serverPort}`)
   await connectionDB()
})