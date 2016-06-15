import Rx from 'rx'

export default function events (evs = []) {
  return {
    componentWillMount () {
      var streams = evs.reduce(function (res, eventName) {
        res[eventName] = new Rx.Subject()
        return res
      }, {})

      Object.assign(this, streams, {__streams: streams})
    },
    componentWillUnmount () {
      evs.forEach((ev) => this.__streams[ev].onCompleted())
    }
  }
}
