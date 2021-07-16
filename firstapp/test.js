import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Clipboard from 'expo-clipboard';

export const Test = () => {
  const [copiedText, setCopiedText] = React.useState('');

  const copyToClipboardOne = () => {
    Clipboard.setString('hello world');
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  return (
    <View>
      <Button title="Click here to copy to Clipboard" onPress={copyToClipboardOne} />
      <Button title="View copied text" onPress={fetchCopiedText} />
      <Text>{copiedText}</Text>
    </View>
  );
}
