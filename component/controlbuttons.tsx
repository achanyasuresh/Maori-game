import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ControlButtonProps {
  title: string;
  onPress: () => void;
}

const ControlButton: React.FC<ControlButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ControlButton;
