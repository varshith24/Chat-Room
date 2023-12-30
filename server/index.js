const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
    console.log(`user connected ${socket.id}`);


    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User with id : ${socket.id} joined room ${data} `)
    })

    socket.on("send_message", (data) => {
        console.log(data)
        socket.to(data.room).emit("receive_message",data);
    })

    socket.on("disconnect", () => {
        console.log(`User disconnected : ${socket.id}`);
    })

})

app.use(express.json())
app.use(cors())



server.listen(3001, () => {
    console.log("Server Running on 3001")
})