import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.headerText}>WVH Coding Challenge</Text>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginLeft: 20,
      marginRight: 20,
  },
    headerText: {
        fontSize: 26,
    },
    bodyText: {
        fontSize: 17,
        textAlign: 'center',
        marginBottom: 17,
    },
    taskText: {
        fontSize: 17,
        marginBottom: 5,
    },
    bold: {
        fontWeight: "700",
    }
});
