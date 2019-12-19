import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Accelerometer } from "expo-sensors";

const ws = new WebSocket("http://192.168.0.164:1337");
ws.onopen = () => {
  ws.send("klient expo się podłączył");
};

export default class AccelerometerSensor extends Component {
  state = {
    accelerometerData: {},
    connected: false,
    ace: false
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    this.setState({ ace: !this.state.ace });
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  };

  _connection = () => {
    if (!this._subscription) {
      alert("accelerometer is off, turn it on to send data");
    } else {
      this.state.connected = !this.state.connected;
      if (this.state.connected) {
        this.interval = setInterval(() => {
          ws.send(JSON.stringify(this.state.accelerometerData, null, 4));
        }, 20);
      } else {
        clearInterval(this.interval);
      }
    }
  };

  _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      this.setState({ accelerometerData });
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
    clearInterval(this.interval);
    this.state.connected = false;
  };

  render() {
    let { x, y, z } = this.state.accelerometerData;
    return (
      <View style={styles.sensor}>
        <Text style={styles.text}>Accelerometer</Text>
        <Text style={styles.text}>
          x: {round(x)} y: {round(y)} z: {round(z)}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this._toggle}
            style={[
              styles.button,
              this.state.ace ? styles.active : styles.unactive
            ]}
          >
            <Text>Toggle Accelerometer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._connection}
            style={[
              styles.button,
              this.state.connected ? styles.active : styles.unactive
            ]}
          >
            <Text>Toggle websockets</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10
  },
  sensor: {
    marginTop: 45,
    paddingHorizontal: 10
  },
  text: {
    textAlign: "center"
  },
  active: {
    backgroundColor: "green"
  },
  unactive: {
    backgroundColor: "red"
  }
});
