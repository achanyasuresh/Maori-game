import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../../lib/supabase';
import { useContext } from 'react';
import { PlayerContext } from '../../../context/playercontext';

type LocalRootStackParamList = {
  SignIn: undefined;
  Home: undefined;
};
type SignInNavigationProp = StackNavigationProp<LocalRootStackParamList, 'SignIn'>;
export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [isImageLoaded, setImageLoaded] = useState(false);
  const navigation = useNavigation<SignInNavigationProp>();
    const { currentPlayerName, setCurrentPlayerName } = useContext(PlayerContext);

  const handleSignIn = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });
      if (error) {
        Alert.alert('Login Failed', error.message); // Show error message if login fails
      } else if (data.session) {
          setCurrentPlayerName(username.includes('@') ? username.split('@')[0] : username);
        // Navigate to Home screen on successful login
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Unable to login. Please try again.');
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.root}>
      {!isImageLoaded && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
      <ImageBackground
        source={require('../../../assets/background/22.png')}
        style={styles.background}
        resizeMode="cover"
        onLoad={() => setImageLoaded(true)}
      >
        {isImageLoaded && (
          <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
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
            {isLoading ? (
              <ActivityIndicator size="large" color="#000" />
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
    marginTop: -180,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#fff',
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
});