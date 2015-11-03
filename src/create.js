const curry = require('curry')

function createGesture (responder, transducer, getInitialLayout, draggable) {
  return draggable
    .onDragStart
    .flatMap(function () {
      return responder(
        draggable.onDragMove,
        getInitialLayout
      )
      .transduce(transducer)
      .takeUntil(draggable.onDragRelease)
    })
};

module.exports = curry(createGesture)
