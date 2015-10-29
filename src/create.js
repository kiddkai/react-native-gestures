import curry from 'curry'

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

export default curry(createGesture)
