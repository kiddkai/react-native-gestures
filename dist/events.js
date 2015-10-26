'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = events;
var Rx = require('rx');

function events() {
  var evs = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

  var streams = evs.reduce(function (res, eventName) {
    res[eventName] = new Rx.Subject();
    return res;
  }, {});

  return {
    componentWillMount: function componentWillMount() {
      Object.assign(this, streams);
    },
    componentWillUnmount: function componentWillUnmount() {
      evs.forEach(function (ev) {
        streams[ev].onCompleted();
      });
    }
  };
}

module.exports = exports['default'];