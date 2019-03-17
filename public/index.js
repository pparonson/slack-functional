import app from "./app.js"
import initModel from "./model.js"
import initCommand from "./cmd.js"
import update from "./update.js"
import view from "./view.js"

const node = document.querySelector("#app")

// the "/" ns endpoint
// const socket = io("http://localhost:8080")

// NOTE: TESTING
// socket.on("connect", () => console.log(`Socket ID: ${socket.id}`))

// returns a new model with a socketio conn
// const _initModel = function(_socket, _model) {
//
//   return {
//     ..._model
//     , clientSocket: [_socket]
//   }
// }

// const el = document.createElement("p")
// el.innerHTML = JSON.stringify(initModel, null, 2)
// node.appendChild(el)

// app(node, update, view, _initModel(socket, initModel))
app(node, update, view, initModel, initCommand)
