import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type LocalRootStackParamList = {
  HomeScreen: undefined;
  Play: undefined;
  Achievement: undefined;
  Settings: undefined;
  Help: undefined;
  GameMode: undefined;
};

type HomeScreenProps = StackNavigationProp<LocalRootStackParamList, 'HomeScreen'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProps>();

  return (
    <ImageBackground
    source={require('../../assets/background/22.png')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* <Text style={styles.title}>Home Screen</Text> */}
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('GameMode')}
        >
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Achievement')}
        >
          <Text style={styles.buttonText}>Achievement</Text>
        </TouchableOpacity>
        
        {/* <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Help')}
        >
          <Text style={styles.buttonText}>Help</Text>
        </TouchableOpacity> */}

        <TouchableOpacity 
          style={styles.settingsIcon} 
          onPress={() => navigation.navigate('Settings')}
        >
          <Image
            source={require('../../assets/Settings.png')} 
            style={styles.settingsImage}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#fff',  
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
});
