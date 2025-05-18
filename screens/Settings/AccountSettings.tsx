import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type LocalRootStackParamList = {
  AccountSettings: undefined;
  Home: undefined;
  Settings: undefined;
  ChangeUsername: undefined;
  ChangePassword: undefined;
  
};

type SignInNavigationProp = StackNavigationProp<LocalRootStackParamList, 'AccountSettings'>;

export default function AccountSettings() {
  const navigation = useNavigation<SignInNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Settings</Text>

      <TouchableOpacity
        style={styles.button} 
        onPress={() => navigation.navigate('ChangeUsername')}
      >
        <Text style={styles.buttonText}>Change Username</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('ChangePassword')}
      >
        <Text style={styles.buttonText}>Change Password</Text>
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
