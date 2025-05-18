import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; // Adjust this import path as necessary

interface TokenSelectorProps {
  tokens: string[];
  onSelectToken: (token: string) => void;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({ tokens, onSelectToken }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Select a Token</Text>
    {tokens.map((token, index) => (
      <TouchableOpacity
        key={index}
        style={styles.tokenButton}
        onPress={() => onSelectToken(token)}
      >
        <Text style={styles.tokenText}>{token}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

type SelectTokenScreenProps = NativeStackScreenProps<RootStackParamList, 'SelectTokenScreen'>;

const SelectTokenScreen: React.FC<SelectTokenScreenProps> = ({ navigation }) => {
  const tokens = ['Token1', 'Token2', 'Token3'];

  const handleSelectToken = (token: string) => {
    console.log('Selected token:', token);
    navigation.navigate('AddPlayers', { selectedToken: token });
  };

  return <TokenSelector tokens={tokens} onSelectToken={handleSelectToken} />;
};

export default SelectTokenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  tokenButton: {
    padding: 10,
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 10,
    width: '50%',
    alignItems: 'center',
  },
  tokenText: {
    color: '#fff',
    fontSize: 16,
  },
});