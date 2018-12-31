import {h} from "virtual-dom"
import hh from "hyperscript-helpers"
import * as R from "ramda"

const {
  pre, div, h1, ul, li, img, form, input
} = hh(h)

function msgListItem(_className, _msg) {
  const {user, timestamp, msgTxt} = _msg
  return div({className: _className}
    , [
      div({className: "dib h1"}
        , [img({className: "w1 h1", src: user.userImg})])
      , div({className: "mh1 f6 dib h1 v-top blue"}, [`${user.username}`])
      , div({className: "mh1 f6 dib h1 v-top black-30"}, [`${timestamp}`])
      , div({className: "db mh4 h1 f6"}, [msgTxt])
  ])
}

function msgsList(_className, _msgHistoryArr) {
  const msgListItems =
    R.map(R.partial(msgListItem, ["ma2 db mw-100"]), _msgHistoryArr)
  return div({className: _className}, [
    ...msgListItems
  ])
}

function msgFormView(_model) {
  return div(
    {className: "mh4 h2 ba br2 bg-white-10 w-90 absolute bottom-2"}
    , [
      form(
        {className: "", onsubmit: e => {
          e.preventDefault()
        }}
        , [
          div({className: ""}, [
            input({
              className:"input-reset bn ml1 bg-white-10 w-100 h2 f6"
              , placeholder: "Enter message", type: "text", value: "" // TODO
            })
          ])
        ]
    )
  ])
}

function rmListItem(_className, _rm) {
  const {rmTitle} = _rm
  return div({className: _className}, [
    div({className: "f5 ml4 mb2 white-80"}, rmTitle)
  ])
}

function rmsList(_className, _rmsArr) {
  const rmListItems = R.map(R.partial(rmListItem, ["mw-100"]), _rmsArr)
  return div({className: _className}, [
    ...rmListItems
  ])
}

function nsListItem(_className, _ns) {
  const {nsImg} = _ns
  return div({className: _className}, [
    // div({className: ""}, [
    //   img({className: "w2 h2", src: nsImg})
    // ])
    img({className: "", src: nsImg})
  ])
}

function nsList(_className, _nsArr) {
  const nsListItems =
    R.map(R.partial(
      nsListItem
      , ["mv2 pa1 br3 w2 h2 bg-white-80 center"]), _nsArr)
  return div({className: _className}, [
    ...nsListItems
  ])
}

function colView3(_className, _model) {
  const {msgHistory} = _model.namespaces[0].nsRooms[0]
  return div({className: _className}, [
    div({className: "f3 ma2 h2"}, "Current Room")
    , msgsList("ma2", msgHistory)
    , msgFormView(_model)
  ])
}

function colView2(_className, _model) {
  const {nsRooms} = _model.namespaces[0]
  return div({className: _className}, [
    div({className: "f3 ma2 white-80"}, "Rooms")
    , rmsList("", nsRooms)
  ])
}

function colView1(_className, _model) {
  const {namespaces} = _model
  return div({className: _className}, [
    nsList("center", namespaces)
  ])
}

function view(_model) {
  return div(
    {className: "mw-100 vh-100 flex"}
    , [
      colView1("fl w3 h-100 bg-black-80", _model)
      , colView2("fl w5 h-100 bg-black-60", _model)
      , colView3("fl w-100 h-100 bg-black-10 relative", _model)
    ]
  )
}

export default view
