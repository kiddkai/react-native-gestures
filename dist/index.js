'use strict';

module.exports = {
  drag: require('./drag'),
  pinch: require('./pinch'),
  create: require('./create'),
  draggable: require('./mixins/draggable'),
  events: require('./mixins/events'),
  GestureView: require('./GestureView'),
  responders: {
    general: require('./responder/general'),
    oneFinger: require('./responder/oneFinger'),
    twoFinger: require('./responder/twoFinger')
  }
};