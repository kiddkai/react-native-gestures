import Rx from 'rx';
import Immutable from 'immutable';

function toImmutableTouch(touch) {
  return Immutable.Map({
    timestamp: touch.timestamp,
    target: touch.target,
    pageY: touch.pageY,
    locationX: touch.locationX,
    locationY: touch.locationY,
    identifier: touch.identifier,
    pageX: touch.pageX
  });
}

export default function withSpecificPointerNumbers(n, onMove, getInitialLayout) {
  return Rx.Observable.create(function(o) {
    var state = Immutable.Map();
    var paused = false;

    onMove
      .subscribe(
        function(event) {
          if (!event.touches) {
            return;
          }
          
          let touches = event.touches;

          if (touches.length === n) {
            touches = touches.map(toImmutableTouch);
            if (!state.get('initialLayout')) {
              state = state.withMutations(s => {
                return s
                  .set('initialLayout', Immutable.fromJS(getInitialLayout()))
                  .set('initialTouches', Immutable.fromJS(touches));
              });
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
                .set('timestamp', event.timestamp);
            });

            o.onNext(state);
          }
          else {
            if (paused) {
              return;
            }

            state = state.withMutations(s => {
              return s
                .delete('initialLayout')
                .delete('initialTouches');
            });

            paused = true;
          }
        },
        o.onError.bind(o),
        o.onCompleted.bind(o)
      );

    return function() {
      state = Immutable.Map();
    }; 
  });
}
