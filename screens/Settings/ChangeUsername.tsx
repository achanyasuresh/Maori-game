import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type LocalRootStackParamList = {
  ChangeUsername: undefined;
  Home: undefined;
};

type ChangeUsernameNavigationProp = StackNavigationProp<LocalRootStackParamList, 'ChangeUsername'>;

export default function ChangeUsername() {
  const [oldUsername, setOldUsername] = useState('');  
  const [newUsername, setNewUsername] = useState('');  

  const navigation = useNavigation<ChangeUsernameNavigationProp>();  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Username</Text>

      <TextInput
        style={styles.input}
        placeholder="Old Username"
        value={oldUsername}
        onChangeText={setOldUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="New Username"
        value={newUsername}
        onChangeText={setNewUsername}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Change Username</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.backButton} 
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
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  backButton: {
    marginTop: 10,
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
