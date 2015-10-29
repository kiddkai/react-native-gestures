'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = oneFingerResponder;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _general = require('./general');

var _general2 = _interopRequireDefault(_general);

function oneFingerResponder(onMove, getInitialLayout) {
  return (0, _general2['default'])(1, onMove, getInitialLayout);
}

module.exports = exports['default'];