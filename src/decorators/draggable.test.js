import "../mocks"

import React from "react"
import { View } from "react-native"
import ShallowRenderer from "react-test-renderer/shallow"

import Draggable from "./draggable"

describe("Draggable decorator", () => {
    test("should expose layout and responder", () => {
        const renderer = new ShallowRenderer()
        const decorated = Draggable(View)

        const instance = renderer.render(React.createElement(decorated))

        expect(instance.props).toHaveProperty("layout")
        expect(instance.props).toHaveProperty("responder")
    })
})
