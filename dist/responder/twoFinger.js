/**
 * # Two finger responder
 *
 * This responder will be pretty simple,
 * it extends the general event with few things:
 *
 * 1. initialCenter - the initial center point of the first touch
 * 2. initialDistance - the initial distances of the first touch
 * 3. currentCenter - the current center point of two touches
 * 4. currentDistance - the current distance of two touches
 * 5. increasedDistance - the increased distance from start
 * 6. centerDiff - the different of the center point
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = twoFingerResponder;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _immutable = require('immutable');

var _general = require('./general');

var _general2 = _interopRequireDefault(_general);

function center(touches) {
  var a = touches.get(0);
  var b = touches.get(1);

  return (0, _immutable.Map)({
    x: (a.get('pageX') + b.get('pageX')) / 2,
    y: (a.get('pageY') + b.get('pageY')) / 2
  });
}

function pow2abs(a, b) {
  return Math.pow(Math.abs(a - b), 2);
}

function distance(touches) {
  var a = touches.get(0);
  var b = touches.get(1);

  return Math.sqrt(pow2abs(a.get('pageX'), b.get('pageX')) + pow2abs(a.get('pageY'), b.get('pageY')), 2);
}

function toDeg(rad) {
  return rad * 180 / Math.PI;
}

function angle(touches) {
  var a = touches.get(0);
  var b = touches.get(1);

  var deg = toDeg(Math.atan2(b.get('pageY') - a.get('pageY'), b.get('pageX') - a.get('pageX')));

  if (deg < 0) {
    deg += 360;
  }

  return deg;
}

function mutate(gesture) {
  var initCenter = center(gesture.get('initialTouches'));
  var currentCenter = center(gesture.get('touches'));
  var initDistance = distance(gesture.get('initialTouches'));
  var currentDistance = distance(gesture.get('touches'));
  var initAngle = angle(gesture.get('initialTouches'));
  var currentAngle = angle(gesture.get('touches'));

  return gesture.set('initialCenter', initCenter).set('initialDistance', initDistance).set('initialAngle', initAngle).set('currentCenter', currentCenter).set('currentDistance', currentDistance).set('currentAngle', currentAngle).set('angleChanged', currentAngle - initAngle).set('increasedDistance', currentDistance - initDistance).set('centerDiff', (0, _immutable.Map)({
    x: initCenter.get('x') - currentCenter.get('x'),
    y: initCenter.get('y') - currentCenter.get('y')
  }));
}

function extend(gesture) {
  return gesture.withMutations(mutate);
}

function twoFingerResponder(onMove, getInitialLayout) {
  return (0, _general2['default'])(2, onMove, getInitialLayout).map(extend);
}

module.exports = exports['default'];