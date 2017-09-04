import React, { Component } from "react"
import PropTypes from "prop-types"
import { PanResponder } from "react-native"
import Rx from "rx"

import create from "../create"

const allow = () => true

export default (Decorated, gestures = []) =>
    class extends Component {
        static displayName = "Draggable Decorator"

        static propTypes = {
            streams: PropTypes.object,
        }

        static defaultProps = {
            streams: {},
        }

        state = {
            layout: null,
            responder: null,
        }

        isCurrentTarget = event => {
            return event.target === this.target
        }

        componentWillReceiveProps(props) {
            if (!props.streams.onLayout) {
                return
            }

            const onDragStart = new Rx.Subject()
            const onDragMove = new Rx.Subject()
            const onDragRelease = new Rx.Subject()

            props.streams.onLayout.subscribe(event => {
                this.target = event.target
                this.layout = event.layout
            })

            const responder = PanResponder.create({
                onStartShouldSetPanResponder: allow,
                onStartShouldSetPanResponderCapture: allow,
                onMoveShouldSetPanResponder: allow,
                onMoveShouldSetPanResponderCapture: allow,
                onPanResponderTerminationRequest: allow,
                onPanResponderTerminate: allow,
                onShouldBlockNativeResponder: allow,

                onPanResponderGrant: event =>
                    onDragStart.onNext(event.nativeEvent),
                onPanResponderMove: event =>
                    onDragMove.onNext(event.nativeEvent),
                onPanResponderRelease: event =>
                    onDragRelease.onNext(event.nativeEvent),
            })

            gestures = gestures.concat(this.props.gestures)

            const draggable = {
                onDragStart: onDragStart.filter(this.isCurrentTarget),
                onDragMove: onDragMove.filter(this.isCurrentTarget),
                onDragRelease: onDragRelease.filter(this.isCurrentTarget),
            }

            const layout = Rx.Observable.merge(
                gestures.map(gesture => {
                    return create(
                        gesture.responder,
                        gesture.transducer,
                        () => this.layout,
                        draggable,
                    )
                }),
            )

            this.setState({
                layout,
                responder,
            })
        }

        render() {
            return (
                <Decorated
                    {...this.props}
                    layout={this.state.layout}
                    responder={this.state.responder}
                />
            )
        }
    }
