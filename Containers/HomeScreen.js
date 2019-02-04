import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity
} from "react-native";
//conect  conecta el componente con react y asi poder cambiar el estado
import { connect } from "react-redux";
import { startGame } from "../ducks";

class HomeScreen extends React.Component {
  onPressNewGame = () => {
    this.props.startGame();
    this.props.navigation.navigate("Game");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageTopContainer}>
          <Image
            style={{ flex: 1 }}
            source={require("../assets/images/intro.png")}
            resizeMode="contain"
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onPressNewGame()}
          >
            <Text style={{ color: "#ffffff", fontSize: 20 }}> New Game </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("Instructions");
            }}
          >
            <Text style={{ color: "#ffffff", fontSize: 20 }}>How to play </Text>
          </TouchableOpacity>
        </View>

        <Image
          style={styles.imageBottom}
          source={require("../assets/images/intro2.png")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start"
  },
  imageTopContainer: {
    height: "35%",
    paddingTop: 70,
    paddingBottom: 70,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonsContainer: {
    height: "35%",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center"
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
  },
  imageBottom: {
    width: "100%",
    height: "30%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#ffffff"
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
)(HomeScreen);
