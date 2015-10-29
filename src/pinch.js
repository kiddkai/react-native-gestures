import twoFingerResponder from './responder/twoFinger'
import { map } from 'transducers.js'

export let responder = twoFingerResponder

export let transducer = map(function (gesture) {
  let layout = gesture.get('initialLayout')
  let startX = layout.get('x')
  let startY = layout.get('y')
  let startWidth = layout.get('width')
  let startHeight = layout.get('height')
  let newHeight = startHeight + gesture.get('increasedDistance')
  let scale = newHeight / startHeight
  let newWidth = startWidth * scale
  let xWidthDiff = (newWidth - startWidth) / 2
  let yHeightDiff = (newHeight - startHeight) / 2

  return {
    x: startX - gesture.getIn(['centerDiff', 'x']) - xWidthDiff,
    y: startY - gesture.getIn(['centerDiff', 'y']) - yHeightDiff,
    width: newWidth,
    height: newHeight,
    rotate: gesture.get('angleChanged')
  }
})
