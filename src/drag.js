import Rx from 'rx';
import { map } from 'transducers.js';

export let calculate = map(gesture => {
  let layout = gesture.get('initialLayout');
  let initialTouch = gesture.get('initialTouches').get(0);
  let currentTouch = gesture.get('touches').get(0);
  return layout.withMutations(l =>
    l.set('x', l.get('x')
     + (currentTouch.get('pageX') - initialTouch.get('pageX')))
     .set('y', l.get('y')
     + (currentTouch.get('pageY') - initialTouch.get('pageY')))
  ).toJS();
});

export const GESTURE_NUMBER = 1;
