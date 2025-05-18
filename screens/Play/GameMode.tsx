import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type LocalRootStackParamList = {
  GameMode: undefined;
  Play: undefined;
  Normal: undefined;
  Timed: undefined;
  Settings: undefined;
  AddPlayers: undefined;
  InviteFriend: undefined;
};

type GameModeProps = StackNavigationProp<LocalRootStackParamList, 'GameMode'>;

export default function GameMode() {
  const navigation = useNavigation<GameModeProps>();

  return (
    <ImageBackground
      source={require('../../assets/background/22.png')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Game Mode</Text>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('InviteFriend')}
        >
          <Text style={styles.buttonText}>Normal</Text>
        </TouchableOpacity>
        
        {/* <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Timed')}
        >
          <Text style={styles.buttonText}>Timed</Text>
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
    resizeMode: 'cover', // Makes the image cover the whole screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    marginTop: -150,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#fff', // Changed to white for better contrast
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
  },
});
