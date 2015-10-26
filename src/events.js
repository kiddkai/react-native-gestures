const Rx = require('rx');

export default function events(evs = []) {
  var streams = evs.reduce(function(res, eventName) {
    res[eventName] = new Rx.Subject();
    return res;
  }, {});

  return {
    componentWillMount: function() {
      Object.assign(this, streams);
    },
    componentWillUnmount: function() {
      evs.forEach(function(ev) {
        streams[ev].onCompleted();
      });
    }
  };
}
