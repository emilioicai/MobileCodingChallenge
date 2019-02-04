import { createStackNavigator } from "react-navigation";
import HomeScreen from "../Containers/HomeScreen";
import GameScreen from "../Containers/GameScreen";
import InstructionsScreen from "../Containers/InstructionsScreen";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
    Game: {
      screen: GameScreen,
      navigationOptions: {
        header: null
      }
    },
    Instructions: {
      screen: InstructionsScreen,
      navigationOptions: {
        headerTitle: "How to play"
      },
      headerStyle: {
        backgroundColor: "red"
      }
    }
  },
  {}
);
export default AppNavigator;
