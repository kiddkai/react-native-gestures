import center from './center';
import distance from './distance';
import { Map } from 'immutable';
import {
  filter,
  map,
  compose
} from 'transducers.js';

export let calculate = compose(
  filter(gesture =>
    !(void 0 === gesture.get('touches').get(0) ||
      void 0 === gesture.get('touches').get(1))
  ),
  map(gesture =>
    gesture.withMutations(g => {
      let initCenter = center.ofTwoTouches(gesture.get('initialTouches'));
      let currentCenter = center.ofTwoTouches(gesture.get('touches'));
      let initDistance = distance.ofTwoTouches(gesture.get('initialTouches'));
      let currentDistance = distance.ofTwoTouches(gesture.get('touches'));

      return g
        .set('increasedDistance', currentDistance - initDistance)
        .set('centerDiff', Map({
          x: initCenter.get('x') - currentCenter.get('x'),
          y: initCenter.get('y') - currentCenter.get('y')
        }))
    })
  ),
  map((gesture) => {
    let layout = gesture.get('initialLayout');
    let startX = layout.get('x');
    let startY = layout.get('y');
    let startWidth = layout.get('width');
    let startHeight = layout.get('height');
    let newHeight = startHeight + gesture.get('increasedDistance');
    let scale = newHeight / startHeight;
    let newWidth = startWidth * scale;
    let xWidthDiff = (newWidth - startWidth) / 2;
    let yHeightDiff = (newHeight - startHeight) / 2;

    return {
      x: startX - gesture.getIn(['centerDiff', 'x']) - xWidthDiff,
      y: startY - gesture.getIn(['centerDiff', 'y']) - yHeightDiff,
      width: newWidth,
      height: newHeight 
    };
  }) 
);

export const GESTURE_NUMBER = 2;
