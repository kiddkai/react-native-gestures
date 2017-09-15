import "./mocks"

import React from "react"
import ShallowRenderer from "react-test-renderer/shallow"

import GestureView from "./gesture-view"

describe("Gesture View", () => {
    test("mounts without error", () => {
        const renderer = new ShallowRenderer()
        const component = renderer.render(React.createElement(GestureView))
    })
})
