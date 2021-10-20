const express = require('express')
const app = express()
const { createServer } = require("http");
const { Server } = require("socket.io");
app.use(express.json())
app.use(express.static('public'))
const httpServer = createServer(app);
const io = new Server(httpServer);
//server creation
const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    res.render('index.html');
})


io.on("connection", (socket) => {
    console.log("New connection added: " + socket.id);
    socket.on("getCoordinates", (x, y, color) => {
        io.emit("receive", x, y, color);
    });
    socket.on("clear-canvas", () => {
        io.emit("clear-canvas");
    });

});
