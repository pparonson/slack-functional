// this is a playground attempt to handle the socket.io client implementation
// independent from the mvu pattern within on client-socketio.js file and using
// events

document.addEventListener("DOMContentLoaded", readyHandler)

function readyHandler() {
  // alert("DOM is ready.. Loading socketio")

  const socket = io("http://localhost:8080") // the / ns endpoint

  // NOTE: TESTING
  socket.on("connect", () => console.log(`Socket ID: ${socket.id}`))

  // listen for nsList, which is a list of all of the namespaces
  // NOTE: socket is connecting to the main ns
  socket.on("nsList", nsData => {
    // console.log(`nsData: ${JSON.stringify(nsData, null, 2)}`)

    // add a click listener for each ns
    // NOTE: getElementsByClassName returns a "live" collection NOT array
    // NOTE: Array.from will handle collections as if arrays
    const namespaces = Array.from(document.getElementsByClassName("namespace"))
    namespaces.forEach(ns => {
      // console.log(`namespaces: ${ns}`)
      ns.addEventListener("click", e => {
        // console.log(e.target)
        const nsEndpoint = ns.getAttribute("data-ns")
        console.log(`Clicked nsEndpoint: ${nsEndpoint}`)
      })
    })

    // connect the /wiki ns endpoint
    const nsSocket = io("http://localhost:8080/wiki")
    nsSocket.on("rmList", nsRooms => {
      // nsRooms.forEach(room => {
      //   console.log(`ROOM: ${room}`)
      // })
      const rooms = Array.from(document.getElementsByClassName("room"))
      rooms.forEach(rm => {
        rm.addEventListener("click", e => {
          const rmTitle = rm.getAttribute("data-rm")
          console.log(`Clicked rmTitle: ${rmTitle}`)
        })
      })
    })

  })
}

// // receive msg from server
// socket.on("messageFromServer", msg => {
//   console.log(`dataFromServer: ${msg.data}`)
//
//   // send msg back to server
//   socket.emit("messageToServer", {data: "Data from client"})
//
//   // ping server
//   // socket.on("ping", () => console.log("Ping received from server"))
//   //
//   // socket.on("pong", latency => {
//   //   console.log(`Latency: ${latency}`)
//   //   console.log("Pong was sent to server")
//   // })
// })

// TODO: edit DOM state
// let messages = []
// document.querySelector("#message-form").addEventListener("submit", (event) => {
//   event.preventDefault()
//   // get the input message
//   const msg = document.querySelector("#user-message").value
//   // send the msg to the server via socketio
//   socket.emit("inputMessage", {text: msg})
//   // receive broadcast input message from server to all clients
//   socket.on("broadcastMessage", _msg => {
//     // messages += _msg.text
//     // messages.forEach(item => {
//     //   document.querySelector("#messages").innerHTML = `<div>${item}</div>`
//     // })
//     document.querySelector("#messages").innerHTML += `<div>${_msg.text}</div>`
//   })
// })

// function connectNsSocket(_nsEndpoint) {
//   const nsSocket = io(`http://localhost:8080/wiki`)
//   nsSocket.on("connect", socket => {
//     console.log(`Client socket ID: ${socket.id} has joined: ${_nsEndpoint}`)
//   })
// }
