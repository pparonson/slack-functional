import app from "./app.js"
import initModel from "./model.js"
import update from "./update.js"
import view from "./view.js"

// import app from "./app"
// import initModel from "./model"
// import update from "./update"
// import view from "./view"

const node = document.querySelector("#app")

// const el = document.createElement("p")
// el.innerHTML = JSON.stringify(initModel, null, 2)
// node.appendChild(el)

app(node, update, view, initModel)
