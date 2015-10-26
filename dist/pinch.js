'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _center = require('./center');

var _center2 = _interopRequireDefault(_center);

var _distance = require('./distance');

var _distance2 = _interopRequireDefault(_distance);

var _immutable = require('immutable');

var _transducersJs = require('transducers.js');

var calculate = (0, _transducersJs.compose)((0, _transducersJs.filter)(function (gesture) {
  return !(void 0 === gesture.get('touches').get(0) || void 0 === gesture.get('touches').get(1));
}), (0, _transducersJs.map)(function (gesture) {
  return gesture.withMutations(function (g) {
    var initCenter = _center2['default'].ofTwoTouches(gesture.get('initialTouches'));
    var currentCenter = _center2['default'].ofTwoTouches(gesture.get('touches'));
    var initDistance = _distance2['default'].ofTwoTouches(gesture.get('initialTouches'));
    var currentDistance = _distance2['default'].ofTwoTouches(gesture.get('touches'));

    return g.set('increasedDistance', currentDistance - initDistance).set('centerDiff', (0, _immutable.Map)({
      x: initCenter.get('x') - currentCenter.get('x'),
      y: initCenter.get('y') - currentCenter.get('y')
    }));
  });
}), (0, _transducersJs.map)(function (gesture) {
  var layout = gesture.get('initialLayout');
  var startX = layout.get('x');
  var startY = layout.get('y');
  var startWidth = layout.get('width');
  var startHeight = layout.get('height');
  var newHeight = startHeight + gesture.get('increasedDistance');
  var scale = newHeight / startHeight;
  var newWidth = startWidth * scale;
  var xWidthDiff = (newWidth - startWidth) / 2;
  var yHeightDiff = (newHeight - startHeight) / 2;

  return {
    x: startX - gesture.getIn(['centerDiff', 'x']) - xWidthDiff,
    y: startY - gesture.getIn(['centerDiff', 'y']) - yHeightDiff,
    width: newWidth,
    height: newHeight
  };
}));

exports.calculate = calculate;
var GESTURE_NUMBER = 2;
exports.GESTURE_NUMBER = GESTURE_NUMBER;