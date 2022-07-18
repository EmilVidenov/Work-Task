const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const io = require('socket.io-client')

const app = express()
const server = http.createServer(app)
const socket = io('http://localhost:3000')
socket.on('connect', () => {
    displayMessage(`You connected with id: ${socket.id}`)
})

socket.emit('custom-event', 10, 'Hi', {a: 'a'})

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))
app.use(express.json())

server.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})
