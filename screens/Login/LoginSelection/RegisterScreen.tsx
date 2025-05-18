import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../../lib/supabase';
type LocalRootStackParamList = {
  Register: undefined;
  SignIn: undefined;
};
type RegisterNavigationProp = StackNavigationProp<LocalRootStackParamList, 'Register'>;
export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<RegisterNavigationProp>();
  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: username,
        password,
      });
      if (error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('Registration successful! Please verify your email.');
        navigation.navigate('SignIn');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <ImageBackground
      source={require('../../../assets/background/22.png')} // Add your background image here
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={username}
          onChangeText={setUsername}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
         style={styles.input}
         placeholder="Password"
         value={password}
         onChangeText={setPassword}
         secureTextEntry={true}
        />
        <TextInput
         style={styles.input}
         placeholder="Re-Enter Password"
         value={confirmPassword}
         onChangeText={setConfirmPassword}
         secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(255, 255, 255, 0.37)', // Semi-transparent background for better contrast
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#000',
    marginTop:-180
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  backImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});