/**
 * Here is the beggining of everything. All the other responders
 * including one finger touch responder and two finger touch responder
 * will use this responder as the basic responder, what the other
 * responder will do is adding properties to the result which comes
 * from this responder.
 */

import Rx from 'rx'
import Immutable from 'immutable'
import curry from 'curry'

function toImmutableTouch (touch) {
  return Immutable.Map({
    timestamp: touch.timestamp,
    target: touch.target,
    pageY: touch.pageY,
    locationX: touch.locationX,
    locationY: touch.locationY,
    identifier: touch.identifier,
    pageX: touch.pageX
  })
}

function reset (s) {
  return s
    .delete('initialLayout')
    .delete('initialTouches')
}

function genernalResponder (n, onMove, getInitialLayout) {
  return Rx.Observable.create(function (o) {
    var state = Immutable.Map()
    var paused = false

    onMove
      .subscribe(
        function (event) {
          if (!event.touches) {
            return
          }
          let touches = event.touches

          if (touches.length === n) {
            touches = touches.map(toImmutableTouch)
            if (!state.get('initialLayout')) {
              state = state.withMutations(s => s
                .set('initialLayout', Immutable.fromJS(getInitialLayout()))
                .set('initialTouches', Immutable.fromJS(touches)))
            }

            state = state.withMutations(s => {
              return s
                .set('target', event.target)
                .set('pageX', event.pageX)
                .set('pageY', event.pageY)
                .set('locationX', event.locationX)
                .set('locationY', event.locationY)
                .set('identifier', event.identifier)
                .set('touches', Immutable.fromJS(touches))
                .set('timestamp', event.timestamp)
            })

            o.onNext(state)
          } else {
            if (paused) {
              return
            }

            state = state.withMutations(reset)
            paused = true
          }
        },
        o.onError.bind(o),
        o.onCompleted.bind(o)
      )

    return function () {
      state = Immutable.Map()
    }
  })
}

export default curry(genernalResponder)
