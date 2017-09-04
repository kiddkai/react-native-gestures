import curry from "curry"

function create(responder, transducer, getInitialLayout, draggable) {
    return draggable.onDragStart.flatMap(() => {
        return responder(draggable.onDragMove, getInitialLayout)
            .transduce(transducer)
            .takeUntil(draggable.onDragRelease)
    })
}

export default curry(create)
