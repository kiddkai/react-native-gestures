React Native Gestures
=====================

> React Native Composable Gesture Library

Showcase
--------

![](http://i.imgur.com/qxzroIb.gif?1)


Quick Sample
------------

```js
import React, {
  View,
  Text
} from 'react-native';

import {
  drag,
  pinch,
  GestureView
} from 'react-native-gestures';

export default React.createClass({
  render() {
    onGestureError(err) {
      console.error(err);
    },
    return (
      <View>
        <GestureView gestures={[drag]}>
          <Text>I can move</Text>
        </GestureView>

        <GestureView gestures={[pinch]}>
          <Text>I can do pinch</Text>
        </GestureView>

        <GestureView gestures={[pinch, drag]}>
          <Text>I can move and pinch</Text>
        </GestureView>
      </View>
    );
  }
});
```
