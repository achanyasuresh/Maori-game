import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type LocalRootStackParamList = {
  Help: undefined;
  Dictionary: undefined;
  HowtoPlay: undefined;
  Home: undefined;
  
};

type HelpProps = StackNavigationProp<LocalRootStackParamList, 'Help'>;

export default function Help() {
  const navigation = useNavigation<HelpProps>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help</Text>

      <TouchableOpacity
        style={styles.button} 
        onPress={() => navigation.navigate('Dictionary')}
      >
        <Text style={styles.buttonText}>Dictionary</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('HowtoPlay')}
      >
        <Text style={styles.buttonText}>How To Play</Text>
      </TouchableOpacity>
      
     

      <TouchableOpacity 
        style={styles.settingsIcon} 
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require('../../assets/Settings.png')} 
          style={styles.settingsImage}
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
  settingsIcon: {
    position: 'absolute',
    top: 10,  
    right: 10, 
  },
  settingsImage: {
    width: 30, 
    height: 30, 
    resizeMode: 'contain',
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
