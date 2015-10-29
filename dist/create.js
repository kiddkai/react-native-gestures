'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _ramda = require('ramda');

function createGesture(responder, transducer, getInitialLayout, draggable) {
  return draggable.onDragStart.flatMap(function () {
    return responder(draggable.onDragMove, getInitialLayout).transduce(transducer).takeUntil(draggable.onDragRelease);
  });
};

exports['default'] = (0, _ramda.curry)(createGesture);
module.exports = exports['default'];