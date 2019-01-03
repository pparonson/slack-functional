const server = require("http").createServer();
const io = require(socket.io)(server, {
  serveClient: false,
  wsEngine: "ws" // uws is not supported since it is a native module
});

const PORT = 3000
const port = process.env.PORT || PORT

io.on("connect", onConnect)
server.listen(port, () => console.log(`Server is listening on PORT: ${PORT}`))

function onConnect(socket){
  console.log(console.log(`connect ${socket.id}`))

  socket.on("disconnect", () => console.log(`disconnect ${socket.id}`))
}
