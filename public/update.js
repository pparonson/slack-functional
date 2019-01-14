const MSGS = {
  SELECT_NAMESPACE: "SELECT_NAMESPACE"
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
    // connect to namespace socket
    connectNsSocket(nsEndpoint)
    return {
      ..._model
      , nsId: nsId
      , nsTitle: nsTitle
      , nsImg: nsImg
      , nsEndpoint: nsEndpoint
      , nsRooms: [...nsRooms]
    }
  }

  // default case
  return _model
}

// helpers
function connectNsSocket(_nsEndpoint) {
  const nsSocket = io(`http://localhost:8080/wiki`)
  nsSocket.on("connect", socket => {
    console.log(`Client socket ID: ${socket.id} has joined: ${_nsEndpoint}`)
  })
}

export default update
