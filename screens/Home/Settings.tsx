import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
 
type LocalRootStackParamList = {
  Settings: undefined;
  GameSettings: undefined;
  AccountSettings: undefined;
  Home: undefined;
  
};

type SettingsProps = StackNavigationProp<LocalRootStackParamList, 'Settings'>;

export default function Settings() {
  const navigation = useNavigation<SettingsProps>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity
        style={styles.button} 
        onPress={() => navigation.navigate('GameSettings')}
      >
        <Text style={styles.buttonText}>Game Settings</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('AccountSettings')}
      >
        <Text style={styles.buttonText}>Account Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',  
  },
  button: {
    backgroundColor: '#000000',  
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',  
  },
  backbutton: {
    position: 'absolute',
    top: 20,  
    left: 10, 
    zIndex: 1,
  },
  backImage: {
    width: 30, 
    height: 30, 
    resizeMode: 'contain',
  }
});