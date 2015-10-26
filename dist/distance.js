'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.ofTwoTouches = ofTwoTouches;
function pow2abs(a, b) {
  return Math.pow(Math.abs(a - b), 2);
}

function ofTwoTouches(touches) {
  var a = touches.get(0);
  var b = touches.get(1);

  return Math.sqrt(pow2abs(a.get('pageX'), b.get('pageX')) + pow2abs(a.get('pageY'), b.get('pageY')), 2);
}