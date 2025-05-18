import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type LocalRootStackParamList = {
  LoginSelection: undefined;
};

type LoadingScreenNavigationProp = StackNavigationProp<LocalRootStackParamList, 'LoginSelection'>;

export default function KupuKupuLoading() {
  const navigation = useNavigation<LoadingScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('LoginSelection'); 
    }, 3000);
    
    return () => clearTimeout(timer); 
  }, [navigation]);

    return (
        <ImageBackground
            source={require('../../assets/background/22.png')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                {/*<Image*/}
                {/*    source={require('../../assets/Kupu Kupu.png')}*/}
                {/*    style={styles.logo}*/}
                {/*/>*/}
                <Text style={styles.gameName}>Kupu Kupu</Text>
                <Text style={styles.text}>Loading</Text>
                <ActivityIndicator size="large" color="#0000ff" />
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
  //  backgroundColor: '#f0f8ff', 
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
    },
  gameName: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "white",
    },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color:"white",
  },
})
