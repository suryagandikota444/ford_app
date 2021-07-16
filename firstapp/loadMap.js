import React from 'react';
import openMap from 'react-native-open-maps';
import { FlatList, Text, View, ScrollView, StyleSheet, Button, Image, TouchableOpacity, TextInput, ImageBackground, TouchableHighlight} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

export const loadMap = ({route}) => {
    const {latitude, longitude} = route.params;
    var lat = parseFloat(latitude);
    var long = parseFloat(longitude);
    const styles = StyleSheet.create({
      mapcontainer: {
            height: 600,
            width: 400,
            justifyContent: 'flex-end',
            alignItems: 'center',
      },
      map: {
            ...StyleSheet.absoluteFillObject,
      },
    })
    return (
      <View>
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
      <View >
        <Text>Your car is currently located in: Dearborn, MI</Text>
      <TouchableOpacity style={{height:40,  backgroundColor: "#d3d3d3",alignItems:'center',justifyContent:'center', borderRadius: 10, marginTop:10}} onPress={() => openMap({latitude: lat, longitude: long, provider: "apple", query: "Ford Rotunda Center"})} title="Get Directions">
        <Text>Get Directions</Text>
      </TouchableOpacity>
    </View>
    </View>
    );
  }