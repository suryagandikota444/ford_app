import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ScrollView, StyleSheet, Button, Image, TouchableOpacity, TextInput, ImageBackground, TouchableHighlight} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

function reverseGeoCoding(latitude, longitude) {
    const [addressInfo, setAddressInfo] = useState({});
    const [loading, setLoading] = useState(true);
    
    const api_key = 'AIzaSyAu03IOh03m668y7TKFnS4aazx1e8S7sB0';

    const gmaps_uri = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&key='+api_key;

    useEffect(() => {
    fetch(gmaps_uri)
        .then(response => response.json())
        .then(json => setAddressInfo(json))
        .catch(error => console.error(error))
        .finally(setLoading(false))
    }, []);

    if (!loading) {
        return (addressInfo);
    }
} 
