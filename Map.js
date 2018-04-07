import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          latitude: null,
          longitude: null,
          error: null,
        };
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
            });
          },
          (error) => this.setState({ error: error.message }),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      }

    render(){
        return(
            <View>
                <Text>{this.state.latitude}, {this.state.longitude}</Text>
            </View>
        )
    }
}

