require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http').createServer(app)
// const session = require('express-session')
const io = require('socket.io')(http)
const port = process.env.PORT || 2000
const { join } = require('path')
// const mongo = require('mongodb')



app
    .use(express.static(`${__dirname}/public`))
    .use(express.urlencoded({ extended: true }))
    .set('view engine', 'ejs')
    .set('views', join(`${__dirname}/views`))
    .get('/', (request, response) => {
        response.render('home')
    })

io.on('connection', (socket) => {
    console.log('A user has connected')

    socket.on('message', (message) => {
        socket.broadcast.emit('message', message)
    })

    socket.on('disconnect', () => {
        console.log('A user has disconnected')
    })
})

http.listen(port, function () {
    console.log(`Server listening at http://localhost:${port}`)
})
