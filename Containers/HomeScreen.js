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
            <Text> new Game </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("Instructions");
            }}
          >
            <Text> How to play </Text>
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
    backgroundColor: "blue",
    alignItems: "stretch",
    justifyContent: "flex-start"
  },
  imageTopContainer: {
    height: "35%",
    paddingTop: 70,
    paddingBottom: 70,
    backgroundColor: "#f9e6ff",
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
    //backgroundColor: "#80d4ff",
    backgroundColor: "transparent",
    padding: 15,
    marginVertical: 5,
    width: 200,
    borderColor: "#ff9966",
    borderStyle: "solid",
    borderWidth: 3,
    borderRadius: 6
  },
  imageBottom: {
    width: "100%",
    height: "30%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#f9e6ff"
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
