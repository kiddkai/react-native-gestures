const Rx = require('rx')
const sinon = require('sinon')
const genernalResponder = require('../../../src/responder/general')

let touch = (x, y) => {
  return {
    locationX: x,
    locationY: y,
    pageX: x,
    pageY: y
  }
}

let event = (x, y, touches) => {
  return {
    target: 10,
    pageX: x,
    pageY: y,
    locationX: x,
    locationY: y,
    touches
  }
}

describe('genernalResponder', function () {
  let getInitialLayout

  beforeEach(function () {
    getInitialLayout = () => {
      return {
        target: 10,
        x: 100,
        y: 100,
        width: 100,
        height: 100
      }
    }
  })

  it('filter out the touches with incorrect touch numbers', function (done) {
    let source = [
      event(101, 101, [touch(101, 101)]),
      event(101, 101, [touch(101, 101), touch(101, 101)]),
      event(101, 101, [touch(101, 101), touch(101, 101)])
    ]

    genernalResponder(1, Rx.Observable.from(source), getInitialLayout)
      .toArray().subscribe(function (results) {
        results.should.have.lengthOf(1)
        genernalResponder(2, Rx.Observable.from(source), getInitialLayout)
          .toArray().subscribe(function (results) {
            results.should.have.lengthOf(2)
            done()
          }, done)
      }, done)
  })

  it('formats the event with initial datas', function (done) {
    let source = [
      event(101, 101, [touch(101, 101)])
    ]

    genernalResponder(1, Rx.Observable.from(source), getInitialLayout)
      .subscribe(function (gesture) {
        gesture.get('pageX').should.equal(101)
        gesture.get('pageY').should.equal(101)
        gesture.get('initialLayout').get('x').should.equal(100)
        gesture.get('initialLayout').get('y').should.equal(100)
        gesture.get('initialLayout').get('width').should.equal(100)
        done()
      }, done)
  })

  it('will try to get the new layout and touch info when gesture number changed', function (done) {
    getInitialLayout = sinon.stub().returns({
      target: 10,
      x: 100,
      y: 100,
      width: 100,
      height: 100
    })

    let source = [
      event(101, 101, [touch(101, 101)]),
      event(101, 101, [touch(101, 101), touch(101, 101)]),
      event(101, 101, [touch(101, 101), touch(101, 101)]),
      event(101, 101, [touch(102, 102)]),
      event(101, 101, [touch(103, 103)])
    ]

    genernalResponder(1, Rx.Observable.from(source), getInitialLayout)
      .takeLast(1)
      .subscribe(function (gesture) {
        gesture.getIn(['initialTouches', 0, 'pageX']).should.equal(102)
        gesture.getIn(['initialTouches', 0, 'pageY']).should.equal(102)
        sinon.assert.calledTwice(getInitialLayout)
        done()
      }, done)
  })
})
