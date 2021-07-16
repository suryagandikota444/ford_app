import React from 'react';
import { TouchableOpacity, TextInput, View, Text} from 'react-native';

export const login = ({ navigation }) => {
    const [name, onChangeName] = React.useState('');
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style={{height: 40,margin: 12, fontSize:30}}
          onChangeText={onChangeName}
          value={name}
          placeholder="Enter Your Name!"
          textAlign={'center'}
        />
        <TouchableOpacity style={{height:40, width:125, backgroundColor: "#d3d3d3",alignItems:'center',justifyContent:'center', borderRadius: 10, marginBottom:10}} 
          onPress={() => {
            navigation.navigate(' ', {
              name: name,
            });
          }}>
          <Text style={{fontSize:24,}}>Enter</Text>
        </TouchableOpacity>
      </View>
    );
  }
