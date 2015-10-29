import Rx from 'rx'
import create from '../create'
import { PanResponder } from 'react-native'

function yes () { return true }

export default function draggableMixin (gestureDefs) {
  gestureDefs = gestureDefs || []

  var target
  var layout

  let getInitialLayout = () => layout
  let isCurrentTarget = (ev) => ev.target === target

  return {
    componentWillMount () {
      let onDragStart = new Rx.Subject()
      let onDragMove = new Rx.Subject()
      let onDragRelease = new Rx.Subject()

      this
        .onLayout
        .take(1)
        .subscribe(ev => target = ev.target)

      this
        .onLayout
        .subscribe(ev => layout = ev.layout)

      let draggable = {
        onDragStart: onDragStart.filter(isCurrentTarget),
        onDragMove: onDragMove.filter(isCurrentTarget),
        onDragRelease: onDragRelease.filter(isCurrentTarget)
      }

      this.gestureResponder = PanResponder.create({
        onStartShouldSetPanResponder: yes,
        onStartShouldSetPanResponderCapture: yes,
        onMoveShouldSetPanResponder: yes,
        onMoveShouldSetPanResponderCapture: yes,
        onPanResponderGrant: (evt) => onDragStart.onNext(evt.nativeEvent),
        onPanResponderMove: (evt, gestureState) => onDragMove.onNext(evt.nativeEvent),
        onPanResponderTerminationRequest: yes,
        onPanResponderRelease: (evt) => onDragRelease.onNext(evt.nativeEvent),
        onPanResponderTerminate: yes,
        onShouldBlockNativeResponder: yes
      })

      if (this.props && this.props.gestures) {
        gestureDefs = gestureDefs.concat(this.props.gestures)
      }

      this.layoutStream = Rx
        .Observable
        .merge(gestureDefs.map(def =>
          create(def.responder, def.transducer, getInitialLayout, draggable)))
    }
  }
}
