import "./mocks"

import exports from "./index"

describe("Index", () => {
    test("has all expected exports", () => {
        expect(exports).toHaveProperty("create")
        expect(exports).toHaveProperty("Gestures")
        expect(exports).toHaveProperty("GestureView")
        expect(exports).toHaveProperty("Responders")

        expect(exports.Gestures).toHaveProperty("drag")
        expect(exports.Gestures).toHaveProperty("pinch")

        expect(exports.Responders).toHaveProperty("general")
        expect(exports.Responders).toHaveProperty("oneFinger")
        expect(exports.Responders).toHaveProperty("twoFinger")
    })
})
