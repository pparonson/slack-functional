const path = require("path")

const esmImport = require('esm')(module)
const express = require("express")
const socketio = require("socket.io")
const R = require("ramda")

const {namespaces} = esmImport("./public/model").default

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

const io = socketio(expressServer, {
  // make socket.io.js available to serveClient
  // this is the default behavior and not actually needed
  path: "/socket.io"
  , serveClient: true
  // ws server implmentation, also a default
  , wsEngine: "ws"
})

// NOTE: io.on === io.of("/").on
io.of("/").on("connect", socket => {
  socket.emit("messageFromServer", {data: "message from server"})
  socket.on("messageToServer", msg =>
    console.log(`dataFromClient: ${msg.data}`))

  socket.on("inputMessage", _msg => {
    // broadcast msg to all clients
    socket.emit("broadcastMessage", {text: _msg.text})
  })
})

// // loop through each namespace and LISTEN for a connection
// // console.log(`namespaces[0]: ${JSON.stringify(namespaces[0], null, 2)}`)
// R.forEach(ns => {
//   const nsSocket = io.of(ns.nsEndpoint)
//   nsSocket.on("connect", socket => {
//     console.log(`${socket.id} has joined ${ns.nsEndpoint}`)
//   })
// }, namespaces)

// io.on("connect", socket => {
//   // build up an array to send to client with nsImg and nsEndpoint for each ns
//   let nsData = R.map(ns => {
//     return {
//       nsImg: ns.nsImg
//       , nsEndpoint: ns.nsEndpoint
//     }
//   }, namespaces)
//   // console.log(`nsData: ${JSON.stringify(nsData, null, 2)}`)
//
//   // send the nsData to the client.  need to use socket (not io), bc we want it
//   // to go to just the clients
//   socket.emit("nsList", nsData)
// })
