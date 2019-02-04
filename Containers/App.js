import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppNavigation from "../Navigation/AppNavigation";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Reducer from "../ducks";

const store = createStore(Reducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});
