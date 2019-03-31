import {diff, patch} from "virtual-dom"
import createElement from "virtual-dom/create-element"
import io from "socket.io-client"
import * as R from "ramda"

// WARNING: IMPURE CODE BELOW
function app(_node, _update, _view, _model, _command) {
  let model = _model
  let currentView = _view(dispatch, model)
  let rootNode = createElement(currentView)
  let socket = socketEffects(null, dispatch, _command)

  // render the currentView to the DOM
  _node.appendChild(rootNode)

  function dispatch(_msg) {
    const updates = _update(_msg, model)
    const isArray = R.type(updates) === "Array"
    model = isArray ? updates[0] : updates
    const command = isArray ? updates[1] : null
    socket = socketEffects(socket, dispatch, command)
    const updatedView = _view(dispatch, model)
    // compare currentView to updatedView to render changes
    const patches = diff(currentView, updatedView)
    // Update the DOM with the results of a patches diff
    rootNode = patch(rootNode, patches)
    // set the currentView to the new updatedView
    currentView = updatedView
  }
}

// helper fns
function socketEffects(_socket, _dispatch, _command) {
  let socket
  let nsSocket
  if (_command === null) {
    // socket = _socket[0]
    return [..._socket]
  }

  if (_command.type === "CONNECT") {
    const {url, nsp} = _command
    if (nsp !== "/") {
      socket = _socket[0]
      nsSocket = io(`${url}${nsp}`) // ie localhost:8080/wiki
      nsSocket.on("connect", () => {
        // console.log(`app.js : nsSocket ID : ${nsSocket.id}`)
        // console.log(`app.js : nsSocket nsp : ${nsSocket.nsp}`)
        alert(`app.js : nsSocket ID : ${nsSocket.id}`)
        alert(`app.js : nsSocket nsp : ${nsSocket.nsp}`)
        // _dispatch({type: "SOCKET_CONNECTED", id: socket.id})
      })

      // receive msg from server
      // nsSocket.of(nsp).on("messageFromServer", msg => {
      //   console.log(`dataFromServer: ${msg.data}`)
      //   // send msg back to server
      //   nsSocket.emit("messageToServer", {data: "Data from client"})
      // })
    } else {
      socket = io(url)
    }

    socket.on("connect", () => {
      console.log(`app.js : Socket ID : ${socket.id}`)
      console.log(`app.js : Socket nsp : ${socket.nsp}`)
      // _dispatch({type: "SOCKET_CONNECTED", id: socket.id})
    })

    // receive msg from server
    socket.on("messageFromServer", msg => {
      console.log(`dataFromServer: ${msg.data}`)
      // send msg back to server
      socket.emit("messageToServer", {data: "Data from client"})
    })

  }

  return [socket, nsSocket]
}


export default app
