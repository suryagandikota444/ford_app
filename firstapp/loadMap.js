import React from 'react';
import { View, StyleSheet,} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

export const loadMap = ({route}) => {
    const {latitude, longitude} = route.params;
    var lat = parseFloat(latitude);
    var long = parseFloat(longitude);
    const styles = StyleSheet.create({
      mapcontainer: {
            height: 400,
            width: 400,
            justifyContent: 'flex-end',
            alignItems: 'center',
      },
      map: {
            ...StyleSheet.absoluteFillObject,
      },
    })
    return (
      <View style={styles.mapcontainer}>
        <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: lat,
              longitude: long,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            showUserLocation={false} >
            <Marker coordinate={{
              latitude: lat,
              longitude: long,
            }}  />
        </MapView>
      </View>
    );
  }