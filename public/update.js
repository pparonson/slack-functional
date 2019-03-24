const MSGS = {
  CONNECT: "CONNECT"
  , SOCKET_CONNECTED: "SOCKET_CONNECTED"
  , SELECT_NAMESPACE: "SELECT_NAMESPACE"
  , SELECT_ROOM: "SELECT_ROOM"
}

export function selectRoomMsg(_id) {
  return {
    type: MSGS.SELECT_ROOM
    , rmId: _id
  }
}

export function selectNamespaceMsg(_id) {
  return {
    type: MSGS.SELECT_NAMESPACE
    , nsId: _id
  }
}

export function connectMsg(_nsEndpoint) {
  return {
    type: MSGS.CONNECT
    , url: `http://localhost:8080${_nsEndpoint}`
  }
}

function update(_msg, _model) {
  if (_msg.type === MSGS.SELECT_ROOM) {
    const {rmId, rmTitle, namespace, privateRm, msgHistory} =
      _model.namespaces[_model.nsId].nsRooms[_msg.rmId]
    const room = {
      rmId
      , rmTitle
      , namespace
      , privateRm
      , msgHistory
    }
    return {
      ..._model
      , room
    }
  }

  if (_msg.type === MSGS.SELECT_NAMESPACE) {
    const {nsId, nsTitle, nsImg, nsEndpoint, nsRooms} =
      _model.namespaces[_msg.nsId]
    // connect the ns socket
    const cmd = connectMsg(nsEndpoint)
    return [
      {
        ..._model
        , nsId: nsId
        , nsTitle: nsTitle
        , nsImg: nsImg
        , nsEndpoint: nsEndpoint
        , nsRooms: [...nsRooms]
      }
      , cmd
    ]
  }

  if (_msg.type === MSGS.SOCKET_CONNECTED) {
    console.log(`socket ID: ${_msg.socket.id} has joined: ${_msg.socket.nsp}`)
    return _model
  }

  // default case
  return _model
}

export default update
