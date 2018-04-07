import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Map from './Map';

export default class App extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <View style={styles.container}>
        <Map/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
