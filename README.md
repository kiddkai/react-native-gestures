React Native Gestures
=====================

:warning: This package is still in early stage, it will have a heaps of API changes before it move to 1.0 :warning:

> React Native Composable Gesture Library

[![Build Status](https://travis-ci.org/kiddkai/react-native-gestures.svg)](https://travis-ci.org/kiddkai/react-native-gestures)
[![npm version](http://img.shields.io/npm/v/react-native-gestures.svg?style=flat-square)](https://npmjs.org/package/react-native-gestures "View this project on npm")
[![npm version](http://img.shields.io/npm/dm/react-native-gestures.svg?style=flat-square)](https://npmjs.org/package/react-native-gestures "View this project on npm")
[![Issue Stats](http://issuestats.com/github/kiddkai/react-native-gestures/badge/pr?style=flat-square)](https://github.com/kiddkai/react-native-gestures/pulls?q=is%3Apr+is%3Aclosed)
[![Issue Stats](http://issuestats.com/github/kiddkai/react-native-gestures/badge/issue?style=flat-square)](https://github.com/kiddkai/react-native-gestures/issues?q=is%3Aissue+is%3Aclosed)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)


Showcase
--------

![](http://imgur.com/6dCrcfL.gif)

Getting Start
--------------

Assuming you are using `react-native`, because I don't know how it will work
in other libraries...

* Install via npm

```bash
npm i -S react-native-gestures
```

Then write some js like the simple code samples as a React component
and render it in your `react-native` app.

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
    );
  }
});
```

APIs
----------

### <GestureView>

As you can see, it's just a very simple React component you can use in this package, maybe
it will have more components in the future, or not.

There are few properties it accpets:

* gestures - a `Array` of [gesture](#gestures)s 
* onError  - a `Function` will be called when anything bad happens
* style    - a `style` same as `<View>`'s `style` property
* toStyle  - a mapping function that allow you to pick the changes you want to css style
* children - ... you know, just React children, nothing special

Example:

```js
let style = { position: 'absolute', backgroundColor: '#F00' };

<GestureView
  style={style}
  onError={console.error.bind(console)}
  gestures={[...]}>
  <Text>This is the children I say</Text>
</GestureView>
```

### Gestures

Every gesture in this module is just a simple combination of two things:

1. A `transducer` called `calculate`(please suggest me a better name)

   This is the actual function that calculates the new positions of the view
   when the move gesture event comes in.

2. A `number` called `GESTURE_NUMBER`
  
   This define that the gesture will start calculate when the gesture number
   matches this number.

   You can set any number you want if your touch screen supports it :p


#### drag

It's just a simple transducer takes one finger input with the move of the
finger and generates new layout of the component.

#### pinch

It's a pinch gesture, also a zoom gesture. It takes two fingers gestures and
generates new layout of the component.

Contribute
----------

Using 

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

