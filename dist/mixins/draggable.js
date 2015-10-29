'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = draggableMixin;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _create = require('../create');

var _create2 = _interopRequireDefault(_create);

var _reactNative = require('react-native');

function yes() {
  return true;
}

function draggableMixin(gestureDefs) {
  gestureDefs = gestureDefs || [];

  var target;
  var layout;

  var getInitialLayout = function getInitialLayout() {
    return layout;
  };
  var isCurrentTarget = function isCurrentTarget(ev) {
    return ev.target === target;
  };

  return {
    componentWillMount: function componentWillMount() {
      var onDragStart = new _rx2['default'].Subject();
      var onDragMove = new _rx2['default'].Subject();
      var onDragRelease = new _rx2['default'].Subject();

      this.onLayout.take(1).subscribe(function (ev) {
        return target = ev.target;
      });

      this.onLayout.subscribe(function (ev) {
        return layout = ev.layout;
      });

      var draggable = {
        onDragStart: onDragStart.filter(isCurrentTarget),
        onDragMove: onDragMove.filter(isCurrentTarget),
        onDragRelease: onDragRelease.filter(isCurrentTarget)
      };

      this.gestureResponder = _reactNative.PanResponder.create({
        onStartShouldSetPanResponder: yes,
        onStartShouldSetPanResponderCapture: yes,
        onMoveShouldSetPanResponder: yes,
        onMoveShouldSetPanResponderCapture: yes,
        onPanResponderGrant: function onPanResponderGrant(evt) {
          return onDragStart.onNext(evt.nativeEvent);
        },
        onPanResponderMove: function onPanResponderMove(evt, gestureState) {
          return onDragMove.onNext(evt.nativeEvent);
        },
        onPanResponderTerminationRequest: yes,
        onPanResponderRelease: function onPanResponderRelease(evt) {
          return onDragRelease.onNext(evt.nativeEvent);
        },
        onPanResponderTerminate: yes,
        onShouldBlockNativeResponder: yes
      });

      if (this.props && this.props.gestures) {
        gestureDefs = gestureDefs.concat(this.props.gestures);
      }

      this.layoutStream = _rx2['default'].Observable.merge(gestureDefs.map(function (def) {
        return (0, _create2['default'])(def.responder, def.transducer, getInitialLayout, draggable);
      }));
    }
  };
}

module.exports = exports['default'];