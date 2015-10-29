'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = events;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

function events() {
  var evs = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

  var streams = evs.reduce(function (res, eventName) {
    res[eventName] = new _rx2['default'].Subject();
    return res;
  }, {});

  return {
    componentWillMount: function componentWillMount() {
      Object.assign(this, streams);
    },
    componentWillUnmount: function componentWillUnmount() {
      evs.forEach(function (ev) {
        return streams[ev].onCompleted();
      });
    }
  };
}

module.exports = exports['default'];