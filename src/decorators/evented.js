import React, { Component } from "react"
import Rx from "rx"

export default (Decorated, eventNames = []) =>
    class extends Component {
        static displayName = "Evented Decorator"

        state = {
            streams: {},
        }

        componentDidMount() {
            let streams = {}

            eventNames.forEach(eventName => {
                streams[eventName] = new Rx.Subject()
            })

            this.setState({
                streams,
            })
        }

        componentWillUnmount() {
            eventNames.forEach(eventName => {
                this.state.streams[eventName].onCompleted()
            })
        }

        render() {
            return <Decorated {...this.props} streams={this.state.streams} />
        }
    }
