const path = require("path")

const express = require("express")
const socketio = require("socket.io")

const HTML_FILE = path.join(__dirname, "dist", "index.html")
const PORT = process.env.PORT || 8080

const app = express()

// serve static files
app.use(express.static(__dirname))

// parse json and urlencoded data into req.body
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/", (req, res) => {
  res.sendFile(HTML_FILE)
})

const expressServer = app.listen(PORT, () =>
  console.log(`Express server is listening on PORT: ${PORT}`))

  // loop through each namespace and listen for a connection
  
  const io = socketio(expressServer, {
  // make socket.io.js available to serveClient
  // this is the default behavior and not actually needed
  path: "/socket.io"
  , serveClient: true
  // ws server implmentation, also a default
  , wsEngine: "ws"
})

io.on("connect", socket => {
  socket.emit("messageFromServer", {data: "message from server"})
  socket.on("messageToServer", msg =>
    console.log(`dataFromClient: ${msg.data}`))

  // socket.on("inputMessage", _msg => {
  //   // broadcast msg to all clients
  //   socket.emit("broadcastMessage", {text: _msg.text})
  // })
})
