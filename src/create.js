import { curry } from 'ramda'
import withSpecificPointerNumbers from './withSpecificPointerNumbers'

function createGesture (options, getInitialLayout, draggable) {
  return draggable
    .onDragStart
    .flatMap(() => {
      return withSpecificPointerNumbers(
        options.GESTURE_NUMBER,
        draggable.onDragMove,
        getInitialLayout
      )
      .transduce(options.calculate)
      .takeUntil(draggable.onDragRelease) })
};

export default curry(createGesture)
