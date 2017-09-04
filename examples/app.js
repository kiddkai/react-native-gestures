import React, { Component } from "react"
import { Image, View } from "react-native"
import { Gestures, GestureView } from "./gestures"

const styles = {
    container: {
        backgroundColor: "white",
        flex: 1,
    },
    draggable: {
        backgroundColor: "#f0f0f0",
        position: "absolute",
        width: 188,
        height: 51,
    },
}

const App = () => (
    <View style={styles.container}>
        <GestureView
            style={styles.draggable}
            gestures={[Gestures.drag, Gestures.pinch]}
        >
            <Image pointerEvents={"none"} source={require("./sample.png")} />
        </GestureView>
    </View>
)

export default App
