import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.03; //few blocks
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const points = [
  {
    key: 1,
    coordinate: {latitude: 38.99362310388709, longitude:-76.94091223793413},
    title: 'test',
    description: 'test',
    image: 'https://cdn2.iconfinder.com/data/icons/fatcow/32x32/pizza.png',
  },
  {
    key: 2,
    coordinate: {latitude: 38.9936, longitude:-76.95},
    title: 'test2',
    description: 'test2',
    image: 'https://cdn2.iconfinder.com/data/icons/fatcow/32x32/pizza.png',
  }

]

export default class App extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          latitude: 0,
          longitude: 0,
          error: null,
          region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        };

        this.onRegionChange = this.onRegionChange.bind(this);
        this.handlePress = this.handlePress.bind(this);
    }

    onRegionChange(region){	
      clearTimeout(this.timerForMap);
      this.timerForMap=setTimeout(()=>{
        //This will fire only when  user is done moving the map, or after zooming in/out is finished.
        this.setState({ region });
      },500);	
   }

   handlePress(e){
    const event = e.nativeEvent;
    const {latitude, longitude } = event.coordinate;
    const clickedPoint = points.filter(point => {
      const pointLat = point.coordinate.latitude;
      const pointLng = point.coordinate.longitude;
      return latitude === pointLat && longitude === pointLng;
    });

    console.log(clickedPoint);
   }
    
    componentDidMount(){
        navigator.geolocation.getCurrentPosition(
          (position) => {
            //init region(viewport) on user position
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

            clearTimeout(this.timerForMap);
            onRegionChange(region);
            
          },
          (error) => this.setState({ error: error.message }),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      }



    render(){
        const circles = this.state.latitude ? 
          <React.Fragment>
          <Circle 
          center={ {latitude: this.state.latitude, longitude:this.state.longitude} }
          radius={250}
          strokeColor='rgba(192,203,255,0.4)'
          fillColor='rgba(192,203,255,0.4)'
          /> 
          <Circle 
            center={ {latitude: this.state.latitude, longitude:this.state.longitude} }
            radius={500}
            strokeColor='rgba(255,102,102,0.2)'
            fillColor='rgba(255,102,102,0.2)'
          /> 
          </React.Fragment>
          : null

        return(
            <View>
                {/* <Text>{this.state.latitude}, {this.state.longitude}</Text> */}
                <MapView style={styles.mapView}
                  region={this.state.region}
                  onRegionChange={this.onRegionChange}
                >
                  {
                    points.map(point=> (
                      <Marker 
                        key={point.key}
                        coordinate={point.coordinate}
                        title={point.title}
                        description={point.description}
                        image={point.image}
                        onPress={this.handlePress}
                      />
                    ))
                  }

                  <Marker 
                    coordinate= { {latitude: this.state.latitude, longitude:this.state.longitude} }
                  />
                  {circles}
                </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  mapView: {
    width,
    height,
    ...StyleSheet.absoluteFillObject
  }
});
  