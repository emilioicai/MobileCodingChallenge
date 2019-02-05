import { StyleSheet, Dimensions } from "react-native";

const largePhone = Dimensions.get("window").width > 320;
export default (styles = StyleSheet.create({
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
  textTopContainer: {
    width: "20%",
    marginTop: 40,
    marginLeft: 10
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
    shadowOpacity: 0.8,
    elevation: 1
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
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    elevation: 1
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
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    elevation: 1
  },

  modal: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5
  },

  modal3: {
    height: "50%",
    width: "85%"
  },
  text: {
    marginTop: 10,
    color: "black",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 10,
    color: "#3B5998"
  },
  btn: {
    margin: 10,
    width: "90%",
    backgroundColor: "transparent",
    padding: 10
  }
}));
