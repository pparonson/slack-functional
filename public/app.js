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

  // dispatch handle the update model state and _view sequence
  function dispatch(_msg) {
    const updates = _update(_msg, model)
    const isArray = R.type(updates) === "Array"
    const model = isArray ? updates[0] : updates
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
  }

  if (_command.type === "CONNECT") {
    const {url} = _command
    socket = io(url)
    socket.on("connect", () => {
      console.log(`app.js : Socket ID : ${socket.id}`)
      _dispatch({type: "SOCKET_CONNECTED", id: socket.id})
    })
  }
  return socket
}


export default app
