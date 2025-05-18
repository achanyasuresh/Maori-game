import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

interface TokenProps {
  imageSource: any; 
}

const Token: React.FC<TokenProps> = ({ imageSource }) => {

  const handleTokenClick = () => {
    Alert.alert('Token Clicked', 'You clicked on the token!');
  };

  return (
    <View style={styles.tokenContainer}>
      <TouchableOpacity onPress={handleTokenClick}>
        <Image source={imageSource} style={styles.tokenImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tokenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenImage: {
    width: 50, 
    height: 50, 
  },
});

export default Token;
