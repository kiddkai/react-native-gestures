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

  return {
    componentWillMount: function componentWillMount() {
      var streams = evs.reduce(function (res, eventName) {
        res[eventName] = new _rx2['default'].Subject();
        return res;
      }, {});

      Object.assign(this, streams, { __streams: streams });
    },
    componentWillUnmount: function componentWillUnmount() {
      var _this = this;

      evs.forEach(function (ev) {
        return _this.__streams[ev].onCompleted();
      });
    }
  };
}

module.exports = exports['default'];