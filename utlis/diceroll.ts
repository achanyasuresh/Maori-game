// import React from 'react';
// import { View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// const diceImage = require('../../assets/Dice.png'); // Make sure the path to your dice image is correct
// import { useGame } from '../context/gamecontext';

// const DiceRoll: React.FC = () => {
//   const { movePlayer } = useGame(); // Ensure movePlayer is correctly returned from useGame

//   const rollDice = (): void => {
//     const diceValue: number = Math.floor(Math.random() * 6) + 1; // Generate random dice value between 1 and 6
//     console.log(`Dice Value: ${diceValue}`);

//     try {
//       if (movePlayer) {
//         movePlayer('player1', diceValue); // Assuming 'player1' is a valid ID for the player
//       } else {
//         Alert.alert('Error', 'movePlayer function is not available.');
//       }
//     } catch (error) {
//       console.error('Error moving player:', error);
//       Alert.alert('Error', 'Failed to move player');
//     }
//   };

//   return 
//     <View style={styles.diceContainer}
//       <TouchableOpacity onPress={DiceRoll}
//         <Image source={diceImage} style={styles.diceImage} />
//       </TouchableOpacity>
//     </View>
// };

// const styles = StyleSheet.create({
//   diceContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dice: {
//     width: 50,
//     height: 50,
//   },
// });

// export default DiceRoll;
