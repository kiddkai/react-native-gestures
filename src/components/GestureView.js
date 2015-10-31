import events from './mixins/events'
import draggableMixin from './mixins/draggable'
import React, {
  PropTypes,
  View
} from 'react-native'

var GestureView = React.createClass({
  mixins: [events(['onLayout']), draggableMixin()],

  propTypes: {
    gestures: PropTypes.array.isRequired,
    onError: PropTypes.func.isRequired,
    toStyle: PropTypes.func.isRequired,
    style: PropTypes.any,
    children: PropTypes.array
  },

  componentDidMount () {
    this.layoutStream.subscribe(
      (layout) => this.container.setNativeProps({
        style: this.props.toStyle(layout)
      }),
      (err) => this.props.onError(err)
    )
  },

  render () {
    let props = {
      ref: (container) => this.container = container,
      style: this.props.style,
      onLayout: ({nativeEvent}) => {
        this.onLayout.onNext(nativeEvent)
      },
      ...this.gestureResponder.panHandlers
    }

    return (
      <View {...props}>
        {this.props.children}
      </View>
    )
  }
})

module.exports = GestureView
