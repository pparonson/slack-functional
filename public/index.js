import app from "./app.js"
import initModel from "./model.js"
import update from "./update.js"
import view from "./view.js"

const node = document.querySelector("#app")

// const el = document.createElement("p")
// el.innerHTML = JSON.stringify(initModel, null, 2)
// node.appendChild(el)

app(node, update, view, initModel)
