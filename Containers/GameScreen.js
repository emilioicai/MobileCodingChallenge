import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button
} from "react-native";
import { reasons, missesImages, alphabet, fonts } from "../constants";
import { connect } from "react-redux";
import { selectLetter } from "../ducks";
import { black } from "ansi-colors";

class GameScreen extends React.Component {
  renderImageContainer = () => {
    let misses = parseInt(this.props.misses);
    return (
      <View style={styles.imageContainer}>
        <Text>you are in level {this.props.currentReason + 1}</Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={missesImages[misses]}
        />
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
                  <Text>{letter.toUpperCase()}</Text>
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
                <TouchableOpacity key={i} style={styles.button}>
                  <Text style={{ color: "red" }}>{letter.toUpperCase()}</Text>
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
                  <Text style={{ color: "blue" }}>{letter.toUpperCase()}</Text>
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
    backgroundColor: "blue",
    justifyContent: "center"
    //alignItems: "center"
  },
  ContainerMiddle: {
    height: "20%",
    backgroundColor: "pink",
    alignItems: "center",
    //flexDirection: "row",
    justifyContent: "center"
  },
  reasonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  },
  containerLetter: {
    // width: 30,
    // marginRight: 5,
    // borderBottomColor: "black",
    // borderBottomWidth: 2
    width: 40,
    height: 40,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    margin: 5,
    borderRadius: 5
  },
  imageContainer: {
    height: "40%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  containerBottom: {
    height: "40%",
    backgroundColor: "green",
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
    width: 40,
    height: 40,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    margin: 5,
    borderRadius: 5
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
