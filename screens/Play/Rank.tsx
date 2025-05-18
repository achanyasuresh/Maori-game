  import React from 'react';
  import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
  import { useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
  import { useScore } from '../../context/scorecontext';

  interface Player {
    name: string;
    score: number;
    medal?: 'first' | 'second'; 
    image: any; 
  }
  type RootStackParamList = {
    AddPlayers: undefined;
    GameBoard: undefined;
    Rank: { playerNumber: number; score: number };
  };

  type RankRouteProp = RouteProp<RootStackParamList, 'Rank'>;

  interface RankProps {
    navigation: NavigationProp<RootStackParamList, 'Rank'>;
    route: RankRouteProp;
}

  const Rank: React.FC<RankProps> = ({ navigation, route }) => {
    const { player1Score, player2Score, } = useScore();
    const { playerNumber, score } = route.params;


  const players: Player[] = [
    { name: 'PLAYER 1', score: player1Score, image: require('../../assets/Token1.png') },
    { name: 'PLAYER 2', score: player2Score, image: require('../../assets/Token2.png') },
  ];

  const assignMedals = (players: Player[]) => {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score); 
    sortedPlayers.forEach((player, index) => {
      if (index === 0) player.medal = 'first';
      else if (index === 1) player.medal = 'second';
    });
    return sortedPlayers;
  };

  const rankedPlayers = assignMedals(players);

  interface RankProps {
    navigation: NavigationProp<RootStackParamList, 'AddPlayers'>;
  }

    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require('../../assets/Back Arrow.png')} 
            style={styles.backImage}
          />
        </TouchableOpacity>

        <View style={styles.topPlayersContainer}>
          {rankedPlayers.slice(0, 3).map((player, index) => (
            <View key={index} style={styles.topPlayerContainer}>
              {player.medal && (
                <Image source={getMedalImage(player.medal)} style={styles.medalIcon} />
              )}
              <Image source={player.image} style={styles.playerIcon} />
              <Text style={styles.playerName}>{player.name}</Text>
              <Text style={styles.scoreText}>{player.score}</Text>
            </View>
          ))}
        </View>

        <View style={styles.playerListContainer}>
          {players.map((player, index) => (
            <View key={index} style={styles.playerRow}>
              <View style={styles.playerInfoContainer}>
                <Image source={player.image} style={styles.playerIcon} />
                <Text style={styles.playerName}>{player.name}</Text>
              </View>
              <Text style={styles.scoreText}>{player.score}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const getMedalImage = (medal: 'first' | 'second' | undefined) => {
    switch (medal) {
      case 'first':
        return require('../../assets/FirstPlace.png');
      case 'second':
        return require('../../assets/SecondPlace.png');
      default:
        return null;
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    backButton: {
      marginBottom: 20,
    },
    backImage: {
      width: 24, 
      height: 24, 
    },
    topPlayersContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 30,
    },
    topPlayerContainer: {
      alignItems: 'center',
      marginHorizontal: 10, 
    },
    playerIcon: {
      width: 50, 
      height: 50,
      marginTop: 20,
    },
    medalIcon: {
      width: 80,
      height: 80,
      marginBottom: 5,
    },
    playerName: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',  
    },
    scoreText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',  
    },
    playerListContainer: {
      marginTop: 20,
    },
    playerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 50,
      paddingHorizontal: 10,
    },
    playerInfoContainer: {
      alignItems: 'center', 
    },
  });

  export default Rank;
