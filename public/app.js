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
  if (_command === null) {
    socket = _socket
    return socket
  }

  if (_command.type === "CONNECT") {
    const {url, nsp} = _command
    socket = io(`${url}${nsp}`)
    socket.on("connect", () => {
      _dispatch({type: "SOCKET_CONNECTED", io: socket})
    })

    // receive msg from server
    socket.on("messageFromServer", msg => {
      console.log(`dataFromServer: ${msg.data}`)
      // send msg back to server
      socket.emit("messageToServer", {data: `Data from client, ${socket.id}`})
    })

  }

  return socket
}


export default app
