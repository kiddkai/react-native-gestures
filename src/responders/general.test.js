import "../mocks"

import Rx from "rx"
import sinon from "sinon"
import general from "./general"

const touch = (x, y) => {
    return {
        locationX: x,
        locationY: y,
        pageX: x,
        pageY: y,
    }
}

let event = (x, y, touches) => {
    return {
        target: 10,
        pageX: x,
        pageY: y,
        locationX: x,
        locationY: y,
        touches,
    }
}

describe("General responder", () => {
    let getInitialLayout

    beforeEach(() => {
        getInitialLayout = () => {
            return {
                target: 10,
                x: 100,
                y: 100,
                width: 100,
                height: 100,
            }
        }
    })

    test("filters incorrect number of touches", done => {
        let source = [
            event(101, 101, [touch(101, 101)]),
            event(101, 101, [touch(101, 101), touch(101, 101)]),
            event(101, 101, [touch(101, 101), touch(101, 101)]),
        ]

        general(1, Rx.Observable.from(source), getInitialLayout)
            .toArray()
            .subscribe(function(results) {
                expect(results).toHaveLength(1)
                general(2, Rx.Observable.from(source), getInitialLayout)
                    .toArray()
                    .subscribe(function(results) {
                        expect(results).toHaveLength(2)
                        done()
                    }, done)
            }, done)
    })

    test("adds initial data to events", done => {
        let source = [event(101, 101, [touch(101, 101)])]

        general(
            1,
            Rx.Observable.from(source),
            getInitialLayout,
        ).subscribe(function(gesture) {
            expect(gesture.get("pageX")).toBe(101)
            expect(gesture.get("pageY")).toBe(101)
            expect(gesture.get("initialLayout").get("x")).toBe(100)
            expect(gesture.get("initialLayout").get("y")).toBe(100)
            expect(gesture.get("initialLayout").get("width")).toBe(100)
            done()
        }, done)
    })

    test("gets new layout and touch info when numnber of touches changes", done => {
        getInitialLayout = sinon.stub().returns({
            target: 10,
            x: 100,
            y: 100,
            width: 100,
            height: 100,
        })

        let source = [
            event(101, 101, [touch(101, 101)]),
            event(101, 101, [touch(101, 101), touch(101, 101)]),
            event(101, 101, [touch(101, 101), touch(101, 101)]),
            event(101, 101, [touch(102, 102)]),
            event(101, 101, [touch(103, 103)]),
        ]

        general(1, Rx.Observable.from(source), getInitialLayout)
            .takeLast(1)
            .subscribe(function(gesture) {
                expect(gesture.getIn(["initialTouches", 0, "pageX"])).toBe(102)
                expect(gesture.getIn(["initialTouches", 0, "pageY"])).toBe(102)
                sinon.assert.calledTwice(getInitialLayout)
                done()
            }, done)
    })
})
