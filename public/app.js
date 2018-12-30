import {diff, patch} from "virtual-dom"
import createElement from "virtual-dom/create-element"

// WARNING: IMPURE CODE BELOW
function app(_node, _update, _view, _model) {
  let model = _model
  let currentView = _view(model)
  let rootNode = createElement(currentView)

  // render the currentView to the DOM
  _node.appendChild(rootNode)
}

export default app
