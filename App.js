import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Main from './Main';

export default class App extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <View style={styles.container}>
        <Main/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems:'center',
    paddingTop: 15,
  },
});
