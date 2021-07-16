import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ScrollView, StyleSheet, Button, Image, TouchableOpacity, TextInput, ImageBackground, TouchableHighlight} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Modal from 'react-native-modal';
import { ShareableReactImage } from './instagram_shareable';
import { login } from './loginPage'
import { loadMap } from './loadMap'
import AppLoading from 'expo-app-loading';
import {
  useFonts, 
  Inter_900Black,
}from '@expo-google-fonts/inter';


const jsonToFormData = (json) => {
  const body = [];
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const property in json) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(json[property]);
    body.push(`${encodedKey}=${encodedValue}`);
  }
  return body.join('&');
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 10,
    width:100,
    height:'100%',
  }, Logo: {
    width: 367,
    height: 367,
    resizeMode:'contain',
  }, mainPageButton: {
    height:40, 
    width:390, 
    backgroundColor: "#d3d3d3",
    alignItems:'center',
    justifyContent:'center', 
    borderRadius: 10, 
    marginBottom:10
  }, modalText: {
    //fontFamily:'RubikSans_400Regular',
    fontSize:20, 
    textAlign:'center', 
    margin:20
  },centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  }, modalView: {
    margin: 0,
    height:600,
    width:300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 0,
    alignItems: 'center',
    shadowColor: 'grey',
    shadowOffset: {width: 0,height: 2,},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }, openButton: {
    backgroundColor: '#2b6be4',
    borderRadius: 20,
    elevation: 2,
    margin:10,
  },textStyle: {
   
    fontWeight: 'bold',
    textAlign: 'center',
  }, modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

function mainPage({route, navigation}) {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  })
  const [isLoading, setLoading] = useState(true); 
  const [accessToken, setAccessToken] = useState('');
  const [authData, setAuthData] = useState({'access_token':''});
  const [locData, setLocData] = useState(null);
  const [vehicleData, setVehicleData] = useState( {
    'vehicle':{
      'modelName':'', 
      'modelYear':'', 
      'vehicleLocation':{
        'latitude':0, 
        'longitude':0
      },
      'vehicleDetails': {
        'odometer':0
      }
    }
  });
  
  const {name} = route.params;

  var today = new Date();
  var greetingMessage = ''
  if ((today.getHours() >= 0) && (today.getHours() < 12)) {
    greetingMessage = 'Good Morning';
  } else if ((today.getHours() >= 12) && (today.getHours() < 17)){
    greetingMessage = 'Good Afternoon';
  } else if ((today.getHours() >= 17) && (today.getHours() <= 24)){
    greetingMessage = 'Good Evening';
  }

  let OAuth_uri = 'https://dah2vb2cprod.b2clogin.com/914d88b1-3523-4bf6-9be4-1b96b4f6f919/oauth2/v2.0/token?p=B2C_1A_signup_signin_common'
  
  useEffect(() => {
    fetch(OAuth_uri, {
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'
      },
      body: jsonToFormData({
        'grant_type': 'refresh_token',
        'client_id': '30990062-9618-40e1-a27b-7c6bcb23658a',
        'client_secret':'T_Wk41dx2U9v22R5sQD4Z_E1u-l2B-jXHE',
        'refresh_token':'eyJraWQiOiI2cjIzQ2FTeTF4cFdUUFBxYVRtX01Vc2RKZGo1RWlDTnRtME4yVTAxNTdFIiwidmVyIjoiMS4wIiwiemlwIjoiRGVmbGF0ZSIsInNlciI6IjEuMCJ9.Qr2W37KbOw3aT-QkWCPrnCPhIbTCDGgmdNTM0tha2DLBpJgcspsTxEC_bj9TQt9CADO_x-af9wfPkg1nJqKZW81ivLaISlxnkU7k_0CVqf9hOUjykDxOAeJeb6PnImdY8-tP8QSy98kmKn7xT1UC2nXd9Bdlx99dUTfkMG2tp5CVP25wpVJEShGsnjFBOZvNhW-X1HW_WIG-Z8YFTQhb67iU42PvF7PNQEGIUDMPNRckznpnH0PYNrAsRuJmCKAkUFOa6UeLH07n_X5s1syFXYJ0ptdMGcTtBis2O58rglJ1QMNH7XKfsO_f0Yhn4_azOxGYYw7ZZzemTW1jszqrqg.Er3Zx0Q0hQxy4p-n.idzKKlJEPNQaCZkIcbkRVWI8dd7asDToxsALRlVhejvkdt4thOU7SgPH5jWxJFbMeVVeycaesVh5-BBxrdC8BS-KvKlWjG5nblMjPa-VY2soBkXullNmTJb24Wz6YYs3j3SiMHZ5MCaVaaHS5S5xX9v9c8J-CeFZR9T21IB4WVNtfuBdLRDayr3y1LkTLtHkq1ryjipsfwQnnXjNeBJNf1HWZsQfIZrNT-Ny0j8kcDuuV5AvrBjsVvHun9rbDOXpO_2Aar0gsaDdYL9yyPKSQfZWYN20AxFxWGsolVTx0Tj-S5b-5QjmjA4h-7NzJFs6zewzse9Ezab9Z2muCUGd43UIFZPX4_YjiKbC4nElmeoGuduptD3hyc3vvt-6kB_Ca9Zk-t0-5AjkDOsp21NKj2Tok6-1DOvORBNbTb2x8PMuK9nuF4ZrR84kCplGTYwY2ElHPmZyjr6e-rioQ4_6qz0MVfbmou6a50fYkICwWxCnUawUh1jZvo4eOevIc4qjNCX-pcwiP2psjAL6X_2beUqhRaZZlL_zCfxCJ-JdnOLvHqSQjeOTSiUnOcYag1ARw292-x9lRF3Gj4YLld1qUSzEFhUP0NT5CQxgVO2liGDZwfk7TgBx0iGKMJM1Tk5cfKYHpvmMK3ZyPbIsBtNSJo_DGBD6EvSRPeaLx1z-gge82rN4Wb8Q41UzhsD9EamwQGr8hznhiVjRDcempgzNPjx4h2D0acunXa4aerpIRtYcbVhRqCGzo-JeZ_E_swageG4mYEzf_uF_6kChZpvrJXtA-p44W9OcKEmjZf0s-yTbDK0kXrEO8hfNxRUDqAwphRb_fGxlljSYCqkx608.Flt-j42kONfsAIklxaqMlQ',
      })
    })
      .then(response => response.json())
      .then(json => setAuthData(json))
      .catch(error => console.error(error))
  }, []);

  useEffect(() => {
    setAccessToken(authData.access_token)
  }, [authData])

  useEffect(() => {
    if (accessToken != '') {
      let ford_api = 'https://api.mps.ford.com/api/fordconnect/vehicles/v1/8a7f9fa878849d8a0179579d2f26043a'
      let get_request = {
        method: 'GET',
        headers: {
          'api-version':'2020-06-01',
          'Application-Id':'afdc085b-377a-4351-b23e-5e1d35fb3700',
          'authorization':'Bearer '+ accessToken
        }
      }
      fetch(ford_api, get_request)
        .then(response => response.json())
        .then(json => setVehicleData(json))
        .catch(error => console.error(error))
    } else {
      console.log('accessToken not granted yet!')
    }
  }, [accessToken])

  useEffect(() => {
    if (vehicleData.vehicle.modelYear != '' ) {
      setLoading(false)
    }
  }, [vehicleData])

  return (
    <View>
      {isLoading ? <Text style = {{textAlign: 'center'}}> Loading... </Text>:
      <View>
        <Text style= {{fontWeight:"bold", fontSize:25, fontFamily: 'Inter_900Black', paddingTop: 25, textAlign: 'center'}}> {greetingMessage}, {name}!</Text>
        <Text style= {{fontWeight:"bold", fontSize:25, paddingTop: 25, textAlign: 'center'}}>{vehicleData.vehicle.modelYear} Ford {vehicleData.vehicle.modelName}</Text>
        <View alignItems="center" justifyContent="center">
          <Image
              style={styles.Logo}
              source={require('./assets/ford_edge.png')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.mainPageButton} onPress={loadMap}>
              <Text style={{fontSize:24,}}>Diagnostics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mainPageButton} onPress={() => {navigation.navigate('Vehicle Location', {latitude: vehicleData.vehicle.vehicleLocation.latitude, longitude:vehicleData.vehicle.vehicleLocation.longitude});}}>
              <Text style={{fontSize:24,}}>Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mainPageButton} onPress={() => {navigation.navigate('Badges',{odometer:vehicleData.vehicle.vehicleDetails.odometer});}}>
              <Text style={{fontSize:24,}}>My Car</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mainPageButton} onPress={loadMap}>
              <Text style={{fontSize:24,}}>Vehicle Info</Text>
          </TouchableOpacity>
        </View>
      </View>}
    </View>
    ); 
};

function loadBadges({route}) {
  const [modal100milesVisible, setModal100milesVisible] = useState(false);
  const [modal500milesVisible, setModal500milesVisible] = useState(false);
  const {odometer} = route.params;
  if (odometer >= 100) {
    var hundredMiles = true;
  }
  if (odometer >= 500) {
    var fiveHundredMiles = true;
  }
  if (odometer >= 1000) {
    var thousandMiles = true;
  }

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={modal100milesVisible} 
        onBackdropPress={() => setModal100milesVisible(false)} justifyContent= 'center' alignItems='center'>
        <View style={styles.modalView}>
          <Image style = {{height:300, width:300, resizeMode:'contain', paddingTop:0}}
            source={require('./assets/medal.png')}
          />
          <Text style={{fontSize:20, textAlign:'center', margin:20}}>Congratulations on your first 100 miles! Tag us at @ford on Twitter, Instagram, or Facebook to tell us what you did with your vehicle in your first 100 miles!</Text>
          <Text style={{fontSize:20, textAlign:'center', margin:20}}>#fordfirst100</Text>
        </View>
      </Modal>
      <Modal animationType="fade" transparent={true} visible={modal100milesVisible} 
        onBackdropPress={() => setModal500milesVisible(false)} justifyContent= 'center' alignItems='center'>
        <View style={styles.modalView}>
          <Image style = {{height:300, width:300, resizeMode:'contain', paddingTop:0}}
            source={require('./assets/medal.png')}
          />
          <Text style={{fontSize:20, textAlign:'center', margin:20}}>Congratulations on your first 500 miles! Tag us at @ford on Twitter, Instagram, or Facebook to tell us what you did with your vehicle in your first 500 miles!</Text>
          <Text style={{fontSize:20, textAlign:'center', margin:20}}>#fordfirst500</Text>
          <ShareableReactImage />
        </View>
      </Modal>
      <ScrollView snapToInterval={100} snapToAlignment={"center"}>
          {hundredMiles ? 
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => {
          setModal100milesVisible(true);
        }}>
        <Text style={{textAlign:'center', fontSize:20, color:'white'}} >First 100 Miles!</Text>
        <Image
          style = {{height:200,width:'100%', borderRadius:20,}}
          source={require('./assets/ford_edge_driving.jpg')}
        />
      </TouchableOpacity>:<Text></Text>}
      {fiveHundredMiles ? 
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => {
          setModal500milesVisible(true);
        }}>
        <Text style={{textAlign:'center', fontSize:20, color:'white'}} >First 500 Miles!</Text>
        <Image
          style = {{height:200,width:'100%', borderRadius:20,}}
          source={require('./assets/ford_edge_driving_red.jpg')}
        />
      </TouchableOpacity>:<Text></Text>}
      {fiveHundredMiles ? 
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => {
          setModal500milesVisible(true);
        }}>
        <Image
          style = {styles.medalImage}
          source={require('./assets/medal.png')}
        />
      </TouchableOpacity>:<Text></Text>}
      {fiveHundredMiles ? 
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => {
          setModal500milesVisible(true);
        }}>
        <Image
          style = {styles.medalImage}
          source={require('./assets/medal.png')}
        />
      </TouchableOpacity>:<Text></Text>}
      {fiveHundredMiles ? 
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => {
          setModal500milesVisible(true);
        }}>
        <Image
          style = {styles.medalImage}
          source={require('./assets/medal.png')}
        />
      </TouchableOpacity>:<Text></Text>}
      </ScrollView>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={login} />
        <Stack.Screen name=" " component={mainPage} />
        <Stack.Screen name="Vehicle Location" component={loadMap} />
        <Stack.Screen name="Badges" component={loadBadges} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;