'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = withSpecificPointerNumbers;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function toImmutableTouch(touch) {
  return _immutable2['default'].Map({
    timestamp: touch.timestamp,
    target: touch.target,
    pageY: touch.pageY,
    locationX: touch.locationX,
    locationY: touch.locationY,
    identifier: touch.identifier,
    pageX: touch.pageX
  });
}

function withSpecificPointerNumbers(n, onMove, getInitialLayout) {
  return _rx2['default'].Observable.create(function (o) {
    var state = _immutable2['default'].Map();
    var paused = false;

    onMove.subscribe(function (event) {
      if (!event.touches) {
        return;
      }
      var touches = event.touches;

      if (touches.length === n) {
        touches = touches.map(toImmutableTouch);
        if (!state.get('initialLayout')) {
          state = state.withMutations(function (s) {
            return s.set('initialLayout', _immutable2['default'].fromJS(getInitialLayout())).set('initialTouches', _immutable2['default'].fromJS(touches));
          });
        }

        state = state.withMutations(function (s) {
          return s.set('target', event.target).set('pageX', event.pageX).set('pageY', event.pageY).set('locationX', event.locationX).set('locationY', event.locationY).set('identifier', event.identifier).set('touches', _immutable2['default'].fromJS(touches)).set('timestamp', event.timestamp);
        });

        o.onNext(state);
      } else {
        if (paused) {
          return;
        }

        state = state.withMutations(function (s) {
          return s['delete']('initialLayout')['delete']('initialTouches');
        });
        paused = true;
      }
    }, o.onError.bind(o), o.onCompleted.bind(o));

    return function () {
      state = _immutable2['default'].Map();
    };
  });
}

module.exports = exports['default'];