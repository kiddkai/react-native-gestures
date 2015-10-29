const React = require('react-native')
const {drag, pinch, GestureView} = require('react-native-gestures')
const {View, Text, StyleSheet} = React

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1
  }
})

const movable = {
  backgroundColor: 'green',
  width: 100,
  height: 100,
  position: 'absolute'
}

const ShowCase = React.createClass({
  getInitialState: function () {
    return {
      movablePosition: {}
    }
  },
  render: function () {
    return (
    <View name='Draggable Container' style={styles.container}>
        <GestureView
          style={movable}
          gestures={[drag, pinch]}
          toStyle={(layout) => {
            return {
              top: layout.y,
              left: layout.x,
              width: layout.width,
              height: layout.height,
              transform: [{rotate: `${layout.rotate}deg`}]
            }
          }}
          onError={console.error.bind(console)}>
          <Text>HEHE</Text>
          <Text>HEHE</Text>
        </GestureView>
      </View>
    )
  }
})

module.exports = ShowCase
