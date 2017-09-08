import create from "./create"

import dragGesture from "./gestures/drag"
import pinchGesture from "./gestures/pinch"

import GestureView from "./gesture-view"

import generalResponder from "./responders/general"
import oneFingerResponder from "./responders/one-finger"
import twoFingerResponder from "./responders/two-finger"

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
    Gestures,
    GestureView,
    Responders,
}

export { create, Gestures, GestureView, Responders }
