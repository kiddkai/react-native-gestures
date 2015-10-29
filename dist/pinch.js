'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _responderTwoFinger = require('./responder/twoFinger');

var _responderTwoFinger2 = _interopRequireDefault(_responderTwoFinger);

var _transducersJs = require('transducers.js');

var responder = _responderTwoFinger2['default'];

exports.responder = responder;
var transducer = (0, _transducersJs.map)(function (gesture) {
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
    height: newHeight,
    rotate: gesture.get('angleChanged')
  };
});
exports.transducer = transducer;