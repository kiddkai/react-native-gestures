import Rx from 'rx'

export default function events (evs = []) {
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
