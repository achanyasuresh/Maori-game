import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';

// Define the type for the route params
type RewardRouteParams = {
  players: { icon: string; score: number }[];
};

// Define the prop type for the Reward component
type RewardProps = {
  route: RouteProp<{ params: RewardRouteParams }, 'params'>;
};

const Reward: React.FC<RewardProps> = ({ route }) => {
  const { players } = route.params; // Retrieve players' data from the navigation parameters
 console.log("dataa", players)
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Game Over! 🎉</Text>
      <Text style={styles.subheader}>Here are the results:</Text>
      <FlatList
        data={players}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.playerRow}>
            <Text style={styles.playerIcon}>{item.icon}</Text>
            <Text style={styles.playerScore}>{item.score} pts</Text>
          </View>
        )}
      />
      {/* <Button style={styles.retryButton} title="Retry" /> */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D8CCB7',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop:60,
    marginLeft:40,
    marginBottom: 10,
  },
  subheader: {
    fontSize: 18,
    color: '#555',
    marginBottom: 35,

  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#DDD',
    marginLeft:30,
    marginBottom:30
  },
  playerIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  playerScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  retryButton: {

  }
});

export default Reward;
