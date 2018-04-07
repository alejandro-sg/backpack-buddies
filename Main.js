import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.00003; //few blocks
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          latitude: null,
          longitude: null,
          error: null,
          region: {
            latitude: 0,
            longitude: 0, 
            latitudeDelta: 0,
            longitudeDelta: 0,
          },
        };

        this.onRegionChange = this.onRegionChange.bind(this);
    }

    
    onRegionChange(region) {
      console.log(region);
      this.setState({ region });
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const region = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude, 
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }

            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
              region
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
                <MapView style={styles.mapView}
                  region={this.state.region}
                  onRegionChange={this.onRegionChange}
                >
                  <Marker
                    coordinate={{latitude: 38.99362310388709, longitude:-76.94091223793413}}
                    title="test"
                    description="test"
                  />
                </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  mapView: {
    flex: 1
  }
});
  
