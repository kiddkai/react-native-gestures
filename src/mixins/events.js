const Rx = require('rx')

module.exports = function events (evs = []) {
  var streams = evs.reduce(function (res, eventName) {
    res[eventName] = new Rx.Subject()
    return res
  }, {})

  return {
    componentWillMount () {
      Object.assign(this, streams)
    },
    componentWillUnmount () {
      evs.forEach((ev) => streams[ev].onCompleted())
    }
  }
}
