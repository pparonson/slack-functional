import * as R from "ramda"

const initModel = {
  nsId: 0
  , nsTitle: ""
  , nsImg: ""
  , nsEndpoint: ""
  , nsRooms: []
  , namespaces: [
    {
      nsId: 0
      , nsTitle: "Wiki"
      , nsImg: "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png"
      , nsEndpoint: "/wiki"
      , nsRooms: [
        {
          rmId: 0
          , rmTitle: "New Articles"
          , namespace: "Wiki"
          , privateRm: false
          , msgHistory: [
            {
              msgId: 0
              , user: {userId: 0, username: "paronson", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I went running today."
            }
            , {
              msgId: 1
              , user: {userId: 1, username: "ellebelle", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I prepared a tea party."
            }
            , {
              msgId: 2
              , user: {userId: 2, username: "brookeykay", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I slept."
            }
            , {
              msgId: 3
              , user: {userId: 3, username: "aaronson", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I did all the things."
            }
          ]
        }
        , {
          rmId: 1
          , rmTitle: "Editors"
          , namespace: "Wiki"
          , privateRm: true
          , msgHistory: [
            {
              msgId: 0
              , user: {userId: 0, username: "paronson", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I went running today."
            }
            , {
              msgId: 1
              , user: {userId: 1, username: "ellebelle", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I prepared a tea party."
            }
            , {
              msgId: 2
              , user: {userId: 2, username: "brookeykay", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I slept."
            }
          ]
        }
        , {
          rmId: 2
          , rmTitle: "Other"
          , namespace: "Wiki"
          , privateRm: false
          , msgHistory: [
            {
              msgId: 0
              , user: {userId: 0, username: "paronson", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I went running today."
            }
            , {
              msgId: 1
              , user: {userId: 1, username: "ellebelle", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I prepared a tea party."
            }
          ]
        }
      ]
    }
    , {
      nsId: 1
      , nsTitle: "Mozilla"
      , nsImg: "https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png"
      , nsEndpoint: "/mozilla"
      , nsRooms: [
        {
          rmId: 0
          , rmTitle: "Firefox"
          , namespace: "Mozilla"
          , privateRm: false
          , msgHistory: [
            {
              msgId: 0
              , user: {userId: 0, username: "paronson", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I went running today."
            }
            , {
              msgId: 1
              , user: {userId: 1, username: "ellebelle", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I prepared a tea party."
            }
            , {
              msgId: 2
              , user: {userId: 2, username: "brookeykay", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I slept."
            }
            , {
              msgId: 3
              , user: {userId: 3, username: "aaronson", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I did all the things."
            }
          ]
        }
        , {
          rmId: 1
          , rmTitle: "SeaMonkey"
          , namespace: "Mozilla"
          , privateRm: false
          , msgHistory: [
            {
              msgId: 0
              , user: {userId: 0, username: "paronson", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I went running today."
            }
            , {
              msgId: 1
              , user: {userId: 1, username: "ellebelle", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I prepared a tea party."
            }
            , {
              msgId: 2
              , user: {userId: 2, username: "brookeykay", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I slept."
            }
          ]
        }
        , {
          rmId: 2
          , rmTitle: "SpiderMonkey"
          , namespace: "Mozilla"
          , privateRm: false
          , msgHistory: [
            {
              msgId: 0
              , user: {userId: 0, username: "paronson", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I went running today."
            }
            , {
              msgId: 1
              , user: {userId: 1, username: "ellebelle", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I prepared a tea party."
            }
          ]
        }
        , {
          rmId: 3
          , rmTitle: "Rust"
          , namespace: "Mozilla"
          , privateRm: false
          , msgHistory: [
            {
              msgId: 0
              , user: {userId: 0, username: "paronson", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I went running today."
            }
          ]
        }
      ]
    }
    , {
      nsId: 2
      , nsTitle: "Linux"
      , nsImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"
      , nsEndpoint: "/linux"
      , nsRooms: [
        {
          rmId: 0
          , rmTitle: "Debian"
          , namespace: "Linux"
          , privateRm: false
          , msgHistory: [
            {
              msgId: 0
              , user: {userId: 0, username: "paronson", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I went running today."
            }
            , {
              msgId: 1
              , user: {userId: 1, username: "ellebelle", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I prepared a tea party."
            }
            , {
              msgId: 2
              , user: {userId: 2, username: "brookeykay", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I slept."
            }
            , {
              msgId: 3
              , user: {userId: 3, username: "aaronson", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I did all the things."
            }
          ]
        }
        , {
          rmId: 1
          , rmTitle: "Red Hat"
          , namespace: "Linux"
          , privateRm: false
          , msgHistory: [
            {
              msgId: 0
              , user: {userId: 0, username: "paronson", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I went running today."
            }
            , {
              msgId: 1
              , user: {userId: 1, username: "ellebelle", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I prepared a tea party."
            }
            , {
              msgId: 2
              , user: {userId: 2, username: "brookeykay", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I slept."
            }
          ]
        }
        , {
          rmId: 2
          , rmTitle: "MacOs"
          , namespace: "Linux"
          , privateRm: false
          , msgHistory: [
            {
              msgId: 0
              , user: {userId: 0, username: "paronson", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I went running today."
            }
            , {
              msgId: 1
              , user: {userId: 1, username: "ellebelle", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I prepared a tea party."
            }
          ]
        }
        , {
          rmId: 3
          , rmTitle: "Kernal Development"
          , namespace: "Linux"
          , privateRm: true
          , msgHistory: [
            {
              msgId: 0
              , user: {userId: 0, username: "paronson", userImg: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"}
              , timestamp: new Date()
              , msgTxt: "I went running today."
            }
          ]
        }
      ]
    }
  ]
  , room: {
    rmId: 0
    , rmTitle: ""
    , namespace: ""
    , privateRm: false
    , msgHistory: []
  }
  , addRoom(_rmObj, _nsRooms) {
    // this.rooms.push(roomObj)
    return [..._nsRooms, _rmObj]
  }
  , addMessage(_msg, _history) {
    return [..._history, _msg]
  }
  , clearHistory() {
     // history = []
  }
}

export default initModel
