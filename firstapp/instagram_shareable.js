import Expo from 'expo';
import React, {useRef, useEffect, useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, Linking, Image, Share } from 'react-native';
import { captureRef } from 'react-native-view-shot'
import * as Sharing from 'expo-sharing'
import exampleImage from './assets/ford_edge_driving_red.jpg'
import * as ImageManipulator from "expo-image-manipulator";

export const ShareableReactImage = (props) => {
    const viewRef = useRef();

    const onShare = async () => {
        try {
          const result = await Share.share({
            message: props.message,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
    };
    return (
        <View>
            <TouchableOpacity onPress={onShare}>
                <Text style={{fontSize:20, fontWeight:'600', textAlign:'center'}}> Share </Text>
            </TouchableOpacity>
        </View>
    )
}