import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { reasons, missesImages, alphabet } from "../constants";
import { connect } from "react-redux";
import { selectLetter } from "../ducks";

const largePhone = Dimensions.get("window").width > 320;

class GameScreen extends React.Component {
  renderImageContainer = () => {
    let misses = parseInt(this.props.misses);
    return (
      <View style={styles.topContainer}>
        <View
          style={{
            width: "20%",
            marginTop: 60
          }}
        >
          <Text style={{ color: "#ff8533" }}>
            LEVEL: {this.props.currentReason + 1}
          </Text>
          <Text style={{ color: "#ff0000", marginTop: 5 }}>
            MISSES: {this.props.misses}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            style={styles.imageTop}
            source={missesImages[misses]}
          />
        </View>
      </View>
    );
  };
  renderReasonContainer = () => {
    let reason = reasons[this.props.currentReason];
    let arrReason = reason.split("");
    return (
      <View style={styles.ContainerMiddle}>
        <View style={styles.reasonContainer}>
          {arrReason.map((letter, i) => {
            if (this.props.selectedLetters.indexOf(letter) < 0) {
              return <View key={i} style={styles.containerLetter} />;
            } else {
              return (
                <View key={i} style={styles.containerLetter}>
                  <Text style={{ color: "#ffffff" }}>
                    {letter.toUpperCase()}
                  </Text>
                </View>
              );
            }
          })}
        </View>
      </View>
    );
  };

  onLetterPress = letter => {
    this.props.selectLetter(letter);
  };

  componentWillReceiveProps = nextProps => {
    console.log(this.props.currentReason);
    if (
      nextProps.currentReason !== this.props.currentReason &&
      nextProps.currentReason < reasons.length - 1 &&
      this.props.currentReason === 0
    ) {
      alert("well done! ready  for the  next level?");
    }
    if (
      nextProps.currentReason !== this.props.currentReason &&
      nextProps.currentReason < reasons.length &&
      this.props.currentReason > 0
    ) {
      alert("OMG! almost there");
    }
    if (nextProps.started === false && nextProps.allReasonsGuessed) {
      alert(
        "yehaaaaaaa!!  congratulation you win a new person in your coding team"
      );
      this.props.navigation.navigate("Home");
    }
    if (nextProps.started === false && nextProps.allReasonsGuessed === false) {
      alert("You lose");
      this.props.navigation.navigate("Home");
    }
  };

  renderAlphabetContainer = () => {
    let selectedLetters = this.props.selectedLetters;
    return (
      <View style={styles.containerBottom}>
        <View style={styles.alphabetContainer}>
          {alphabet.map((letter, i) => {
            if (selectedLetters.indexOf(letter) > -1) {
              return (
                <TouchableOpacity
                  disabled={true}
                  key={i}
                  style={styles.buttonOnpress}
                >
                  <Text style={{ color: "grey" }}>{letter.toUpperCase()}</Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  style={styles.button}
                  key={i}
                  onPress={() => {
                    this.onLetterPress(letter);
                  }}
                >
                  <Text style={{ color: "black" }}>{letter.toUpperCase()}</Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this.renderImageContainer()}
        {this.renderReasonContainer()}
        {this.renderAlphabetContainer()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  topContainer: {
    flex: 1,
    flexDirection: "row",

    backgroundColor: "#fff"
  },
  imageContainer: {
    height: "100%",
    width: "80%",
    backgroundColor: "#fff",
    alignItems: "center",
    backgroundColor: "blue"
  },
  imageTop: {
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff"
  },
  ContainerMiddle: {
    height: "20%",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center"
  },
  reasonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  },
  containerLetter: {
    width: largePhone ? 40 : 30,
    height: largePhone ? 40 : 30,
    alignItems: "center",
    backgroundColor: "#3d3d5c",
    justifyContent: "center",
    margin: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8
    //shadowRadius: 2
  },

  containerBottom: {
    height: "30%",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center"
  },
  alphabetContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    width: largePhone ? 40 : 30,
    height: largePhone ? 40 : 30,
    alignItems: "center",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "#660033",
    justifyContent: "center",
    margin: 5,
    borderRadius: 5,
    shadowColor: "#660033",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8
  },
  buttonOnpress: {
    width: largePhone ? 40 : 30,
    height: largePhone ? 40 : 30,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    margin: 5,
    borderRadius: 5,
    shadowColor: "#DDDDDD",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8
  }
});

const mapStateToProps = state => {
  return {
    misses: state.misses,
    selectedLetters: state.selectedLetters,
    currentReason: state.currentReason,
    allReasonsGuessed: state.allReasonsGuessed,
    started: state.started
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectLetter: l => dispatch(selectLetter(l))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameScreen);
