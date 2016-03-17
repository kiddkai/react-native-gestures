/**
 * Here is the beggining of everything. All the other responders
 * including one finger touch responder and two finger touch responder
 * will use this responder as the basic responder, what the other
 * responder will do is adding properties to the result which comes
 * from this responder.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _curry = require('curry');

var _curry2 = _interopRequireDefault(_curry);

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

function reset(s) {
  return s['delete']('initialLayout')['delete']('initialTouches');
}

function genernalResponder(n, onMove, getInitialLayout) {
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

        state = state.withMutations(reset);
        paused = true;
      }
    }, o.onError.bind(o), o.onCompleted.bind(o));

    return function () {
      state = _immutable2['default'].Map();
    };
  });
}

exports['default'] = (0, _curry2['default'])(genernalResponder);
module.exports = exports['default'];