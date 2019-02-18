import {diff, patch} from "virtual-dom"
import createElement from "virtual-dom/create-element"

// WARNING: IMPURE CODE BELOW
function app(_node, _update, _view, _model) {
  // setTimeout(() => console.log(`socket id in app: ${_model.clientSocket[0].id}`), 2000)
  // setTimeout(() => console.log(`socket status in app: ${_model.clientSocket[0].connected}`), 2000)
  // console.log(`socket id in app: ${_model.clientSocket[0].id}`)
  // console.log(`socket status in app: ${_model.clientSocket[0].connected}`)

  let model = _model
  let currentView = _view(dispatch, model)
  let rootNode = createElement(currentView)

  // render the currentView to the DOM
  _node.appendChild(rootNode)

  // dispatch handle the update model state and _view sequence
  function dispatch(_msg) {
    model = _update(_msg, model)
    const updatedView = _view(dispatch, model)
    // compare currentView to updatedView to render changes
    const patches = diff(currentView, updatedView)
    // Update the DOM with the results of a patches diff
    rootNode = patch(rootNode, patches)
    // set the currentView to the new updatedView
    currentView = updatedView
  }
}

export default app
