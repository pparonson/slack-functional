const socket = io("http://localhost:8080")

socket.on("connect", () => console.log(`Socket ID: ${socket.id}`))
// receive msg from server
socket.on("messageFromServer", msg => {
  console.log(`dataFromServer: ${msg.data}`)

  // send msg back to server
  socket.emit("messageToServer", {data: "Data from client"})

  // ping server
  socket.on("ping", () => console.log("Ping received from server"))

  socket.on("pong", latency => {
    console.log(`Latency: ${latency}`)
    console.log("Pong was sent to server")
  })
})
