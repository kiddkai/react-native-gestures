const { fromJS } = require('immutable')
const { into } = require('transducers.js')
const gestureDrag = require('../../src/drag')

function touch (pageX, pageY) {
  return fromJS({
    pageX,
    pageY,
    locationX: pageX,
    locationY: pageY,
    target: 10,
    timestamp: 1
  })
}

function gesture (pageX, pageY, t) {
  return fromJS({
    initialLayout: {
      x: 100,
      y: 100,
      height: 100,
      width: 100
    },
    touches: [t],
    initialTouches: [touch(pageX, pageY)]
  })
}

describe('Gesture Drag', function () {
  it('calculates the differences between initialTouch and currentTouch', function () {
    let result = into(
      [],
      gestureDrag.transducer,
      [gesture(100, 100, touch(101, 99))])

    result[0].x.should.equal(101)
    result[0].y.should.equal(99)
  })
})
