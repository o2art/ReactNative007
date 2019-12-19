import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, Text, Image } from "react-native";

const styles = StyleSheet.create({
  button: {
    padding: 5,
    marginTop: 25,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 4,
    backgroundColor: "#F0F4C3",
    alignSelf: "center"
  },
  butts: {
    flex: 1,
    backgroundColor: "#F0F4C3",
    alignSelf: "flex-start"
  },
  text: {
    fontSize: 24,
    textAlign: "center",
    color: "#212121"
  },
  text2: {
    fontSize: 10,
    textAlign: "center"
  },
  delete: {
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 15,
    marginTop: 15
  }
});

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    buttonStyles = [styles.button];
    if (this.props.text != "start") buttonStyles.push(styles.butts);
    if (this.props.text == "") buttonStyles = [styles.cameras];
    if (this.props.text == "delete") buttonStyles.push(styles.delete);
    return (
      <TouchableOpacity onPress={this.props.call} style={buttonStyles}>
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            color: "#212121"
          }}
        >
          {this.props.text.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Button;
