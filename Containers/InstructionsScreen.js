import React from "react";
import { connect } from "react-redux";
import { startGame } from "../ducks";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity
} from "react-native";

class InstructionsScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#ffffff"
    },
    headerTintColor: "#000000"
  };
  onPressNewGame = () => {
    this.props.startGame();
    this.props.navigation.navigate("Game");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerInstructions}>
          <Text style={{ marginVertical: 10, color: "#9966ff", fontSize: 18 }}>
            1. press on the letters and try to guess the words!
          </Text>
          <Text style={{ marginVertical: 10, color: "#660033", fontSize: 18 }}>
            2. All words are taken from one of Eugenia's Skills
          </Text>
          <Text style={{ marginVertical: 10, color: "#008080", fontSize: 18 }}>
            3. Only 3 word to guess
          </Text>
          <Text style={{ marginVertical: 10, color: "#993399", fontSize: 18 }}>
            4. only 6 oportunities to guess one word
          </Text>
          <Text style={{ marginVertical: 10, color: "#000099", fontSize: 18 }}>
            5. if you win you will get a gift... ;)
          </Text>
          <Text style={{ marginVertical: 10, color: "#cc0000", fontSize: 18 }}>
            6. To play again, press the New Game button
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.onPressNewGame();
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20 }}>New Game </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center"
  },
  containerInstructions: {
    marginTop: 60,
    marginBottom: 40
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ff8533",
    padding: 10,
    marginVertical: 5,
    width: "50%",
    borderColor: "#ff8533",
    borderStyle: "solid",
    borderWidth: 3,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8
  }
});
const mapStateToProps = state => {
  return {
    started: state.started
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startGame: () => dispatch(startGame())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstructionsScreen);
