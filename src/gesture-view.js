import React, { Component } from "react"
import { PanResponder, View } from "react-native"
import PropTypes from "prop-types"
import Rx from "rx"

import create from "./create"

class GestureView extends Component {
    static propTypes = {
        gestures: PropTypes.array,
        onLayout: PropTypes.func,
        onError: PropTypes.func,
    }

    static defaultProps = {
        gestures: [],
        onLayout: layout => ({
            top: layout.y,
            left: layout.x,
            width: layout.width,
            height: layout.height,
            transform: [
                {
                    rotate: layout.rotate + "deg",
                },
            ],
        }),
        onError: () => {},
    }

    state = {
        responder: null,
        stream: null,
    }

    componentDidMount() {
        const onDragStart = new Rx.Subject()
        const onDragMove = new Rx.Subject()
        const onDragRelease = new Rx.Subject()

        const draggable = {
            onDragStart: onDragStart,
            onDragMove: onDragMove,
            onDragRelease: onDragRelease,
        }

        const responder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: event => {
                onDragStart.onNext(event.nativeEvent)
            },
            onPanResponderMove: event => {
                onDragMove.onNext(event.nativeEvent)
            },
            onPanResponderTerminationRequest: () => true,
            onPanResponderRelease: event => {
                onDragRelease.onNext(event.nativeEvent)
            },
            onPanResponderTerminate: () => true,
            onShouldBlockNativeResponder: () => true,
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
        })

        const stream = Rx.Observable.merge(
            this.props.gestures.map(gesture =>
                create(
                    gesture.responder,
                    gesture.transducer,
                    () => this.layout,
                    draggable,
                ),
            ),
        )

        stream.subscribe(
            layout => {
                this.container.setNativeProps({
                    style: this.props.onLayout(layout),
                })
            },
            error => {
                this.props.onError(error)
            },
        )

        this.setState({
            responder,
            stream,
        })
    }

    render() {
        const { responder } = this.state

        if (!responder) {
            return null
        }

        let props = {
            ...this.props,
            ...responder.panHandlers,
            ref: container => {
                this.container = container
            },
            onLayout: event => {
                const { layout, target } = event.nativeEvent

                this.layout = layout
                this.target = target
            },
        }

        return <View {...props}>{this.props.children}</View>
    }
}

export default GestureView

export { GestureView }
