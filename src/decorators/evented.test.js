import "../mocks"

import React from "react"
import { View } from "react-native"
import ShallowRenderer from "react-test-renderer/shallow"

import Evented from "./evented"

describe("Evented decorator", () => {
    test("should expose streams", () => {
        const renderer = new ShallowRenderer()
        const decorated = Evented(View)

        const instance = renderer.render(React.createElement(decorated))

        expect(instance.props).toHaveProperty("streams")
    })
})
