import {h} from "virtual-dom"
import hh from "hyperscript-helpers"
import * as R from "ramda"

import {
  selectNamespaceMsg
  , selectRoomMsg
} from "./update"

const {
  pre, div, h1, img, form, input, i
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
          // TODO
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

function rmListItem(_dispatch, _className, _rm) {
  const {rmId, rmTitle} = _rm
  return div({className: _className}, [
    div({
      className: "f5 ml4 mb2 white-80 pointer dim"
      , attributes: { "data-rm": rmTitle }
      , onclick: () => _dispatch(selectRoomMsg(rmId))
    }, rmTitle)
  ])
}

function rmsList(_dispatch, _className, _rmsArr) {
  const rmListItems = R.map(R.partial(rmListItem, [_dispatch, "mw-100 room"]), _rmsArr)
  return div({className: _className}, [
    ...rmListItems
  ])
}

function nsListItem(_dispatch, _className, _ns) {
  const {nsId, nsImg, nsEndpoint} = _ns
  return div({
    className: _className
    , attributes: { "data-ns": nsEndpoint }
    , onclick: () => {
      _dispatch( selectNamespaceMsg(nsId) )
    }
  }, [img({className: "", src: nsImg})])
}

function nsList(_dispatch, _className, _nsArr) {
  // socket.on("nsList", nsData => {
  //   console.log(`nsData: ${JSON.stringify(nsData, null, 2)}`)
  // })
  const nsListItems =
    R.map(R.partial(
      nsListItem
      , [_dispatch, "mv2 pa1 br3 w2 h2 bg-white-80 center dim pointer namespace"]), _nsArr)
  return div({className: _className}, [
    ...nsListItems
  ])
}

function colView3(_className, _model) {
  const {msgHistory} = _model.room
  return div({className: _className}, [
    div({className: "f3 ma2 h2"}, "Current Room")
    , msgsList("ma2", msgHistory)
    , msgFormView(_model)
  ])
}

function colView2(_dispatch, _className, _model) {
  const {nsRooms} = _model
  return div({className: _className}, [
    div({className: "f3 ma2 white-80 dib"}, "Rooms")
    // , div({className: "dib dim pointer"}
    //   , [i({className: "fas fa-plus-circle f3 white-80"})])
    , rmsList(_dispatch, "db room-list", nsRooms)
  ])
}

function colView1(_dispatch, _className, _model) {
  const {namespaces} = _model
  return div({className: _className}, [
    div({className: "mv2 pa1 br3 w2 h2 bg-white-80 center dim pointer"}
      , [i({className: "fas fa-plus f3 center"})])
    , nsList(_dispatch, "center namespaces", namespaces)
  ])
}

function view(_dispatch, _model) {
  // const socket = io("http://localhost:8080") // the / ns endpoint
  // socket.on("connect", () => console.log(`Socket ID: ${socket.id}`))

  return div(
    {className: "mw-100 vh-100 flex"}
    , [
      colView1(_dispatch, "fl w3 h-100 bg-black-80", _model)
      , colView2(_dispatch, "fl w5 h-100 bg-black-60", _model)
      , colView3("fl w-100 h-100 bg-black-10 relative", _model)
    ]
  )
}

export default view
