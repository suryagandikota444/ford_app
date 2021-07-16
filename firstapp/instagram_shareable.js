import Expo from 'expo';
import React, {useRef, useEffect, useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, Linking, Image } from 'react-native';
import { captureRef } from 'react-native-view-shot'
import * as Sharing from 'expo-sharing'
import exampleImage from './assets/ford_edge_driving_red.jpg'
import * as ImageManipulator from "expo-image-manipulator";

export const ShareableReactImage = () => {
    const viewRef = useRef();

    const shareInstagramPic = async () => {
        const exampleImageUri = Image.resolveAssetSource(exampleImage).uri

        if(!(await Sharing.isAvailableAsync())) {
            alert('Sharing not avilable');
            return;
        }
        let imageProc = await ImageManipulator.manipulateAsync(exampleImageUri);

        const options = {
            dialogText: "#firstford100"
        }

        await Sharing.shareAsync(imageProc.uri, options)

        
    }
    return (
        <View>
            <TouchableOpacity onPress={shareInstagramPic}>
                <Text style={{fontSize:20, fontWeight:'600', textAlign:'center'}}> Share </Text>
            </TouchableOpacity>
        </View>
    )
}