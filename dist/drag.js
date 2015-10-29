'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _transducersJs = require('transducers.js');

var _responderOneFinger = require('./responder/oneFinger');

var _responderOneFinger2 = _interopRequireDefault(_responderOneFinger);

var responder = _responderOneFinger2['default'];

exports.responder = responder;
var transducer = (0, _transducersJs.map)(function (gesture) {
  var layout = gesture.get('initialLayout').set('rotate', 0);
  var initialTouch = gesture.get('initialTouches').get(0);
  var currentTouch = gesture.get('touches').get(0);

  return layout.withMutations(function (l) {
    return l.set('x', l.get('x') + (currentTouch.get('pageX') - initialTouch.get('pageX'))).set('y', l.get('y') + (currentTouch.get('pageY') - initialTouch.get('pageY')));
  }).toJS();
});
exports.transducer = transducer;