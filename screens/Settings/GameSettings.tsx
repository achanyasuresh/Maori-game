import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type LocalRootStackParamList = {
  GameSettings: undefined;
  Home: undefined;
  Settings: undefined;
  Volume: undefined;
  Accessibility: undefined;
  
};

type SignInNavigationProp = StackNavigationProp<LocalRootStackParamList, 'GameSettings'>;

export default function GameSettings() {
  const navigation = useNavigation<SignInNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Settings</Text>

      <TouchableOpacity
        style={styles.button} 
        onPress={() => navigation.navigate('Volume')}
      >
        <Text style={styles.buttonText}>Volume</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Accessibility')}
      >
        <Text style={styles.buttonText}>Accessibility</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.backbutton} 
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require('../../assets/Back Arrow.png')} 
          style={styles.backImage}
        />
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
