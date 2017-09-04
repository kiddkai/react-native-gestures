import React, { Component } from "react"
import { View } from "react-native"
import PropTypes from "prop-types"
import Rx from "rx"
import omit from "lodash/omit"

import evented from "./decorators/evented"
import draggable from "./decorators/draggable"

class GestureView extends Component {
    static propTypes = {
        gestures: PropTypes.array,
        onLayout: PropTypes.func,
        onError: PropTypes.func,
        streams: PropTypes.object,
        layout: PropTypes.object,
        responder: PropTypes.object,
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
        streams: {},
        layout: null,
        responder: null,
    }

    componentWillReceiveProps(props) {
        props.layout.subscribe(
            layout => {
                this.container.setNativeProps({
                    style: props.onLayout(layout),
                })
            },
            error => {
                props.onError(error)
            },
        )
    }

    render() {
        if (!this.props.responder) {
            return null
        }

        let props = {
            ...this.props,
            ...this.props.responder.panHandlers,
            ref: container => {
                this.container = container
            },
            onLayout: event => {
                this.props.streams.onLayout.onNext(event.nativeEvent)
            },
        }

        return <View {...props}>{this.props.children}</View>
    }
}

export default evented(draggable(GestureView), ["onLayout"])

export { GestureView }
