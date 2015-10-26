import events from './events';
import draggableMixin from './draggable';
import create from './create';
import React, {
  PropTypes,
  View
} from 'react-native';

export default React.createClass({
  mixins: [events(['onLayout']), draggableMixin()],
  propTypes: {
    gestures: PropTypes.array.isRequired,
    onError: PropTypes.func.isRequired
  },
  componentDidMount() {
    this.layoutStream.subscribe(
      (layout) => this.container.setNativeProps({
        style: {
          height: layout.height,
          width: layout.width,
          top: layout.y,
          left: layout.x
        }
      }),
      (err) => this.props.onError
    );
  },
  render() {
    let props = {
      ref: (container) => this.container = container,
      style: this.props.style,
      onLayout: ({nativeEvent}) => {
        this.onLayout.onNext(nativeEvent)
      },
      ...this.gestureResponder.panHandlers
    };

    return (
      <View {...props}>
        {this.props.children}
      </View>
    );
  }
});
