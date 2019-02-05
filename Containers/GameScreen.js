import React from "react";
import styles from "./styles/GameScreenStyles";
import { Text, View, Image, TouchableOpacity, Button } from "react-native";
import Modal from "react-native-modalbox";
import { reasons, missesImages, alphabet } from "../constants";
import { connect } from "react-redux";
import { selectLetter } from "../ducks";

class GameScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
    };
  }

  renderImageContainer = () => {
    let misses = parseInt(this.props.misses);
    return (
      <View style={styles.topContainer}>
        <View style={styles.textTopContainer}>
          <Text style={{ color: "#ff8533", fontWeight: "bold" }}>
            LEVEL: {this.props.currentReason + 1}
          </Text>
          <Text style={{ color: "#ff0000", marginTop: 5, fontWeight: "bold" }}>
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
    console.log("this is current", this.props.currentReason);
    console.log("this is next", nextProps);
    if (
      nextProps.currentReason !== this.props.currentReason ||
      (nextProps.started === false && nextProps.allReasonsGuessed)
    ) {
      this.refs.modal3.open();
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

  renderModal = () => {
    return (
      <Modal
        style={[styles.modal, styles.modal3]}
        position={"center"}
        ref={"modal3"}
        isDisabled={this.state.isDisabled}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          {this.props.currentReason === 1 && (
            <View style={{ flex: 1, alignContent: "center" }}>
              <Text style={styles.text}>
                WOO HOO! it was easy, let's go to the next level!
              </Text>

              <Image
                style={{ width: "100%", height: "80%" }}
                resizeMode="contain"
                source={require("../assets/images/superman.jpg")}
              />
            </View>
          )}
          {this.props.currentReason === 2 && !this.props.allReasonsGuessed && (
            <View style={{ flex: 1, alignContent: "center" }}>
              <Text style={styles.text}>
                Almost there my friend, just one more!
              </Text>

              <Image
                style={{ width: "100%", height: "80%" }}
                resizeMode="contain"
                source={require("../assets/images/edna.jpeg")}
              />
            </View>
          )}
          {this.props.allReasonsGuessed && (
            <View style={{ flex: 1, alignContent: "center" }}>
              <Text style={styles.text}>
                Congratulations, you won a new super programmer on your team!
              </Text>

              <Image
                style={{ width: "100%", height: "80%" }}
                resizeMode="contain"
                source={require("../assets/images/superheros.jpg")}
              />
            </View>
          )}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.refs.modal3.close();
              if (this.props.allReasonsGuessed) {
                this.props.navigation.navigate("Home");
              }
            }}
          >
            <Text style={{ color: "red", textAlign: "center", fontSize: 20 }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this.renderImageContainer()}
        {this.renderReasonContainer()}
        {this.renderAlphabetContainer()}
        {this.renderModal()}
      </View>
    );
  }
}

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
