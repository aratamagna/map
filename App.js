import React, { Component } from 'react';
import { StyleSheet, AppRegistry, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

class CurrPosMarker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {longitude: 0, latitude: 0},
      error: null,
    };

    // setInterval(() => {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          this.setState(previousState => {
            return {
              position: {longitude: position.coords.longitude, latitude: position.coords.latitude},
              error: null,
            }
          });
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
          this.setState({ error: error.message })
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    // }, 10000);
  }
  render() {
    return (
      // <View>
      // <Text>{this.state.position.longitude} {this.state.error}</Text>
      // </View>
      <MapView.Marker
      coordinate={this.state.position}
      title=""
      description="description"
      />
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <MapView
      style={styles.map}
      >
      <CurrPosMarker
      style={styles.container}
      />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
