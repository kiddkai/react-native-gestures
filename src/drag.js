import { map } from 'transducers.js'
import oneFingerResponder from './responder/oneFinger'

export let responder = oneFingerResponder

export let transducer = map(function (gesture) {
  let layout = gesture.get('initialLayout').set('rotate', 0)
  let initialTouch = gesture.get('initialTouches').get(0)
  let currentTouch = gesture.get('touches').get(0)

  return layout.withMutations(function (l) {
    return l
      .set('x', l.get('x') +
        (currentTouch.get('pageX') - initialTouch.get('pageX')))
      .set('y', l.get('y') +
        (currentTouch.get('pageY') - initialTouch.get('pageY')))
  }).toJS()
})
