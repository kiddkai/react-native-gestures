'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ramda = require('ramda');

var _withSpecificPointerNumbers = require('./withSpecificPointerNumbers');

var _withSpecificPointerNumbers2 = _interopRequireDefault(_withSpecificPointerNumbers);

function createGesture(options, getInitialLayout, draggable) {
  return draggable.onDragStart.flatMap(function () {
    return (0, _withSpecificPointerNumbers2['default'])(options.GESTURE_NUMBER, draggable.onDragMove, getInitialLayout).transduce(options.calculate).takeUntil(draggable.onDragRelease);
  });
};

exports['default'] = (0, _ramda.curry)(createGesture);
module.exports = exports['default'];