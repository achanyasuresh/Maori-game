import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type LocalRootStackParamList = {
  ChangePassword: undefined;
  Home: undefined;
};

type ChangePasswordNavigationProp = StackNavigationProp<LocalRootStackParamList, 'ChangePassword'>;

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');

  const navigation = useNavigation<ChangePasswordNavigationProp>();

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !reEnterPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (newPassword !== reEnterPassword) {
      alert('New password and re-entered password do not match');
      return;
    }

    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Old Password"
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry={true}
      />

      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={true}
      />

      <TextInput
        style={styles.input}
        placeholder="Re-Enter New Password"
        value={reEnterPassword}
        onChangeText={setReEnterPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
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
