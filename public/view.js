import {h} from "virtual-dom"
import hh from "hyperscript-helpers"
import * as R from "ramda"

const {
  pre, div, h1, ul, li, img, form, input
} = hh(h)

function msgListItem(_className, _msg) {
  const {user, timestamp, msgTxt} = _msg
  return li({className: _className}
    , [
      div({className: "dib h1"}
        , [img({className: "w1 h1", src: user.userImg})])
      , div({className: "mh1 f5 dib h1 v-top blue"}, [`${user.username} ${timestamp}`])
      , div({className: "db ml4 h1"}, [msgTxt])
  ])
}

function msgsList(_className, _msgHistoryArr) {
  const msgListItems =
    R.map(R.partial(msgListItem, ["ma1 db mw-100"]), _msgHistoryArr)
  return div({className: _className}, [
    ...msgListItems
  ])
}

function msgFormView(_model) {
  return div({className: "mh3 mt3 h2 ba br2 bg-white-10"}, [
    form(
      {
        className: ""
        , onsubmit: e => {
          e.preventDefault()
          // _dispatch(addLocationMsg())
        }
      }
      , [
        div({className: ""}, [
          input({
            className:"input-reset bn ml1 bg-white-10 w-100 h2"
            , placeholder: "Enter message", type: "text", value: "" // TODO
          })
        ])
      ]
    )
  ])
}

function rmListItem(_className, _rm) {
  const {rmTitle} = _rm
  return li({className: _className}, [
    div({className: "f5 mb1 white-80"}, rmTitle)
  ])
}

function rmsList(_className, _rmsArr) {
  const rmListItems = R.map(R.partial(rmListItem, ["mw-100"]), _rmsArr)
  return ul({className: _className}, [
    ...rmListItems
  ])
}

function nsListItem(_className, _ns) {
  const {nsImg} = _ns
  return li({className: _className}, [
    div({className: "br3 mw-50 mh-50 bg-white-80 center"}, [
      img({className: "pa1 w2 h2", src: nsImg})
    ])
  ])
}

function nsList(_className, _nsArr) {
  const nsListItems = R.map(R.partial(nsListItem, ["ma1 mw-100"]), _nsArr)
  return ul({className: _className}, [
    ...nsListItems
  ])
}

function colView3(_className, _model) {
  const {msgHistory} = _model.namespaces[0].nsRooms[0]
  return div({className: _className}, [
    div({className: "f3 ma2 h2"}, "Current Room")
    , msgsList("list", msgHistory)
    , msgFormView(_model)
  ])
}

function colView2(_className, _model) {
  const {nsRooms} = _model.namespaces[0]
  return div({className: _className}, [
    div({className: "f3 ma2 white-80"}, "Rooms")
    , rmsList("list", nsRooms)
  ])
}

function colView1(_className, _model) {
  const {namespaces} = _model
  return div({className: _className}, [
    nsList("list", namespaces)
  ])
}

function view(_model) {
  return div(
    {className: "mw-100 vh-100"}
    , [
      colView1("fl w-10 h-100 bg-black-80", _model)
      , colView2("fl w-20 h-100 bg-black-60", _model)
      , colView3("fl w-70 h-100 bg-black-10", _model)
    ]
  )
}

export default view
