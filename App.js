import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Slider, FlatList, TouchableOpacity } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import CustomView from './CustomView.ios.js'

class HomeScreen extends React.Component {
  render() {
    return (
		<ScrollView contentContainerStyle={styles.container}>
            <View>
				<Text style={styles.bodyText}>Hello :)</Text>
                <Text style={styles.bodyText}>There are <Text style={styles.bold}>*4*</Text> task, <Text style={styles.bold}>*2*</Text> must be solved in any way. There is no fixed Solution or Way - you just have to explain it.</Text>
                <Text style={styles.bodyText}>First, please fork this repository, then develop the code in the forked repository and when you're done, send us an email to cc@wirvonhier.de</Text>
            </View>
            <View>
                <Text style={styles.taskText}>Tasks:</Text>
                <Text style={styles.taskText}>• style the app suitable (difficulty lvl 1)</Text>
                <Text style={styles.taskText}>• expand the app to redux (difficulty lvl 2)</Text>
                <Text style={styles.taskText}>• write some native code/component and hook up this code/component in react native (difficulty lvl 8)</Text>
                <Text style={styles.taskText}>• surprise us. seriously, coding something unexpected/creative - but: we _not easily_ to impress. :o) (difficulty lvl over9000)</Text>
            </View>
        </ScrollView>
    );
  }
}

// Redux code
const initialState = {
	colors: []
}

const store = createStore((state = initialState, action) => {

	switch(action.type) {

		case 'ADD_COLOR':
			return Object.assign({}, state, { colors: state.colors.concat([ action.payload ]) });
			break;

		case 'REMOVE_COLOR':
			return Object.assign({}, state, { colors: state.colors.filter(color => color.timestamp !== action.payload.timestamp) });
			break;

	}

})

export const addColorActionCreate = (value) => (
	{
		type: 'ADD_COLOR',
		payload: value
	}
);

export const removeColorActionCreate = (value) => (
	{
		type: 'REMOVE_COLOR',
		payload: value
	}
);


class ReduxDemoScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = { red: 1, green: 0, blue: 0, colors:[] };
    }

	addCurrentColor() {

		const color = { red: this.state.red, green: this.state.green, blue: this.state.blue, timestamp: +new Date() };

		store.dispatch( addColorActionCreate( color ) );

		this.setState(prevState => ({
		  colors: store.getState().colors
		}))

	}

	removeColor(index) {

		const color = this.state.colors[index];

		store.dispatch( removeColorActionCreate( color ) );

		this.setState(prevState => ({
		  colors: store.getState().colors
		}))

	}

	renderItem({ item, index }) {
		return <TouchableOpacity style={{
			width:30,
			height:30,
			backgroundColor: 'rgb('+item.red*255+', '+item.green*255+', '+item.blue*255+')'
		}} onPress={ this.removeColor.bind(this, index) }></TouchableOpacity>;
	}


	render() {

		return (

			<ScrollView contentContainerStyle={styles.container}>

				<FlatList data={this.state.colors} renderItem={this.renderItem.bind(this)} keyExtractor={item => ""+item.timestamp}/>

				<View style={{ width: 150, height: 150,
					backgroundColor: 'rgb('+this.state.red*255+', '+this.state.green*255+', '+this.state.blue*255+')',
					border:'1px solid #ccc', margin: 30 }}>
				</View>

				<View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center', padding: 0, width:'50%' }}>
					<Text>Red {Math.floor(this.state.red*255)}</Text>
	    			<Slider
	      			value={this.state.red}
	      			onValueChange={(red) => this.setState({ red })} />

					<Text>Green {Math.floor(this.state.green*255)}</Text>
	    			<Slider
	      			value={this.state.green}
					onValueChange={(green) => this.setState({ green })} />

					<Text>Blue {Math.floor(this.state.blue*255)}</Text>
	    			<Slider
	      			value={this.state.blue}
					onValueChange={(blue) => this.setState({ blue })} />

					<Button title="Add" onPress={ this.addCurrentColor.bind(this) }/>
				</View>
  			</ScrollView>

		);
	}
}



class NativeComponentScreen extends React.Component {
  render() {
    return (
      <CustomView style={{ flex: 1 }}>
      </CustomView>
    );
  }
}






export default createBottomTabNavigator(
  {
    Home: {
		screen: createStackNavigator({
	  	Home: {
		  	screen: HomeScreen,
		  	navigationOptions: ({ navigation }) => ({ title: 'WvH Coding Challenge' })
	  	}
		}),
		navigationOptions: ({ navigation }) => ({ title: 'Intro' })
	},

    ReduxDemo: {
		selected: true,
		screen: createStackNavigator({
			DetailsScreen: {
				screen: ReduxDemoScreen,
				navigationOptions: ({ navigation }) => ({ title: 'Color Scheme' })
			}
		}),
		navigationOptions: ({ navigation }) => ({ title: 'Redux' })
	},

	NativeComponent: {
		screen: createStackNavigator({
			DetailsScreen: {
				screen: NativeComponentScreen,
				navigationOptions: ({ navigation }) => ({ title: 'Draw Here' })
			}
		}),
		navigationOptions: ({ navigation }) => ({ title: 'iOS' })
	},

  },
  {
    initialRouteName: 'NativeComponent'
  }
);


const styles = StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginLeft: 30,
      marginRight: 30,
	  paddingTop: 20
  },
    headerText: {
        fontSize: 26,
		marginTop: 20,
		marginBottom: 20,
    },
    bodyText: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 15,
    },
    taskText: {
        fontSize: 15,
        marginBottom: 5,
    },
    bold: {
        fontWeight: "700",
    }
});
