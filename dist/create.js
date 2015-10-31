'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _curry = require('curry');

var _curry2 = _interopRequireDefault(_curry);

function createGesture(responder, transducer, getInitialLayout, draggable) {
  return draggable.onDragStart.flatMap(function () {
    return responder(draggable.onDragMove, getInitialLayout).transduce(transducer).takeUntil(draggable.onDragRelease);
  });
};

exports['default'] = (0, _curry2['default'])(createGesture);
module.exports = exports['default'];