const Rx = require('rx')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

let PanResponder = {}

const Draggable = proxyquire('../../src/mixins/draggable', {
  'react-native': {
    PanResponder,
    '@noCallThru': true
  }
})

describe('Draggable', function () {
  beforeEach(function () {
    PanResponder.create = sinon.stub()
  })

  it('should returns a object only have componentWillMount property', function () {
    let mixin = Draggable([() => new Rx.Observer.Subject()])
    mixin.should.have.property('componentWillMount')
  })

  it('it will exposes a PanResponder when will mount called', function () {
    let mixin = Draggable([() => new Rx.Subject()])
    let ctx = {
      onLayout: new Rx.Subject()
    }
    let responderStub = {}
    PanResponder.create.returns(responderStub)
    mixin.componentWillMount.call(ctx)
    ctx.gestureResponder.should.equal(responderStub)
    ctx.layoutStream.should.have.property('subscribe')
  })
})
