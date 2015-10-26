'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.ofTwoTouches = ofTwoTouches;

var _immutable = require('immutable');

function ofTwoTouches(touches) {
  var ga = touches.get(0);
  var gb = touches.get(1);

  return (0, _immutable.Map)({
    x: (ga.get('pageX') + gb.get('pageX')) / 2,
    y: (ga.get('pageY') + gb.get('pageY')) / 2
  });
}