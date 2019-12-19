import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Button from "./Button";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  head: {
    flex: 3,
    backgroundColor: "#CDDC39",
    justifyContent: "center",
    alignItems: "center"
  },
  headtxt: {
    color: "#F0F4C3",
    fontSize: 44
  },
  underheadtxt: {
    color: "#757575",
    fontSize: 20
  },
  button: {
    backgroundColor: "#FF9800",
    flex: 2,
    alignContent: "center",
    justifyContent: "center"
  }
});

class Main extends Component {
  static navigationOptions = {
    header: null,
    title: "Main page"
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.getAce = this.getAce.bind(this);
  }

  getAce() {
    this.props.navigation.navigate("ace");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.headtxt}>AccelerometerApp</Text>
          <Text style={styles.underheadtxt}>use expo-sensors</Text>
          <Text style={styles.underheadtxt}>with websockets</Text>
          <Text style={styles.underheadtxt}>to do some crazy shit</Text>
        </View>
        <View style={styles.button}>
          <Button text={"start"} call={this.getAce} />
        </View>
      </View>
    );
  }
}

export default Main;
