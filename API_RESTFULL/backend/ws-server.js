// Clase Server de libreria de ws
let WServer = require('ws').Server
// Modulo de node para transferir datos y wrapper de mi app
let server = require('http').createServer()
// Importo mi servidor
let app = require('./http-server')


require('dotenv').config()

let wss = new WServer({
    server: server
})

server.on('request', app)

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(`Received: ${message}`)

        ws.send(JSON.stringify({
            answer: 42
        }))
    })
})

server.listen(process.env.PORT, () => {
    console.log(` HTTP/WS server listening on  ${process.env.PORT} `)
})