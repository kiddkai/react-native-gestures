import create from "./create"

import draggableDecorator from "./decorators/draggable"
import eventedDecorator from "./decorators/evented"

import dragGesture from "./gestures/drag"
import pinchGesture from "./gestures/pinch"

import GestureView from "./gesture-view"

import generalResponder from "./responders/general"
import oneFingerResponder from "./responders/one-finger"
import twoFingerResponder from "./responders/two-finger"

const Decorators = {
    draggable: draggableDecorator,
    evented: eventedDecorator,
}

const Gestures = {
    drag: dragGesture,
    pinch: pinchGesture,
}

const Responders = {
    general: generalResponder,
    oneFinger: oneFingerResponder,
    twoFinger: twoFingerResponder,
}

export default {
    create,
    Decorators,
    Gestures,
    GestureView,
    Responders,
}

export { create, Decorators, Gestures, GestureView, Responders }
