import { map } from "transducers.js"

import responder from "../responders/one-finger"

const transducer = map(gesture => {
    const layout = gesture.get("initialLayout").set("rotate", 0)
    const initial = gesture.get("initialTouches").get(0)
    const current = gesture.get("touches").get(0)

    return layout
        .withMutations(layout => {
            const deltaX = current.get("pageX") - initial.get("pageX")
            const delayY = current.get("pageY") - initial.get("pageY")

            return layout
                .set("x", layout.get("x") + deltaX)
                .set("y", layout.get("y") + delayY)
        })
        .toJS()
})

export default {
    responder,
    transducer,
}

export { responder, transducer }
