'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _transducersJs = require('transducers.js');

var calculate = (0, _transducersJs.map)(function (gesture) {
  var layout = gesture.get('initialLayout');
  var initialTouch = gesture.get('initialTouches').get(0);
  var currentTouch = gesture.get('touches').get(0);
  return layout.withMutations(function (l) {
    return l.set('x', l.get('x') + (currentTouch.get('pageX') - initialTouch.get('pageX'))).set('y', l.get('y') + (currentTouch.get('pageY') - initialTouch.get('pageY')));
  }).toJS();
});

exports.calculate = calculate;
var GESTURE_NUMBER = 1;
exports.GESTURE_NUMBER = GESTURE_NUMBER;