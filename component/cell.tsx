import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface CellProps {
  content: React.ReactNode;
  player1Image?: any;
  player2Image?: any;
}

const Cell: React.FC<CellProps> = ({ content, player1Image, player2Image }) => {
  return (
    <View style={styles.cell}>
      <Text style={styles.content}>{content}</Text>
      {player1Image && <Image source={player1Image} style={styles.playerImage} />}
      {player2Image && <Image source={player2Image} style={styles.playerImage} />}
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Ensure positioning context for absolute images
  },
  content: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  playerImage: {
    width: 20,
    height: 20,
    position: 'absolute',
  },
});

export default Cell;
