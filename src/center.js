import { Map } from 'immutable';

export function ofTwoTouches(touches) {
  let ga = touches.get(0);
  let gb = touches.get(1);

  return Map({
    x: (ga.get('pageX') + gb.get('pageX')) / 2,
    y: (ga.get('pageY') + gb.get('pageY')) / 2
  });
}
