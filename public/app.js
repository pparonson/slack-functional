import {diff, patch} from "virtual-dom"
import createElement from "virtual-dom/create-element"
import io from "socket.io-client"

// WARNING: IMPURE CODE BELOW
function app(_node, _update, _view, _model) {
  let model = _model
  let currentView = _view(dispatch, model)
  let rootNode = createElement(currentView)
  let socket = socketEffects(null, dispatch, model)

  // render the currentView to the DOM
  _node.appendChild(rootNode)

  // dispatch handle the update model state and _view sequence
  function dispatch(_msg) {
    model = _update(_msg, model)
    // socket = socketEffects(socket, dispatch, model)
    const updatedView = _view(dispatch, model)
    // compare currentView to updatedView to render changes
    const patches = diff(currentView, updatedView)
    // Update the DOM with the results of a patches diff
    rootNode = patch(rootNode, patches)
    // set the currentView to the new updatedView
    currentView = updatedView
  }
}

function socketEffects(_socket, _dispatch, _model) {
  let socket
  const {cmd} = _model

  if (cmd === null) {
    socket  = _socket
  }

  if (cmd.type === "CONNECT") {
    const {url} = cmd
    socket = io(url)
    socket.on("connect", () => {
      console.log(`app.js : Socket ID : ${socket.id}`)
      // _dispatch({type: "SOCKET_CONNECTED"})
    })
  }
  return socket
}


export default app
