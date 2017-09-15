import "../mocks"

import { fromJS } from "immutable"
import { into } from "transducers.js"
import drag from "./drag"

function touch(pageX, pageY) {
    return fromJS({
        pageX,
        pageY,
        locationX: pageX,
        locationY: pageY,
        target: 10,
        timestamp: 1,
    })
}

function gesture(pageX, pageY, t) {
    return fromJS({
        initialLayout: {
            x: 100,
            y: 100,
            height: 100,
            width: 100,
        },
        touches: [t],
        initialTouches: [touch(pageX, pageY)],
    })
}

describe("Drag", () => {
    test("calculates differences between initialTouch and currentTouch", () => {
        let result = into([], drag.transducer, [
            gesture(100, 100, touch(101, 99)),
        ])

        expect(result[0].x).toBe(101)
        expect(result[0].y).toBe(99)
    })
})
