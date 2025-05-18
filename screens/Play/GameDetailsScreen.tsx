import React, { useState , useEffect} from 'react';
import { supabase } from '../../lib/supabase';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Pressable,
  Alert, 
  Share, 
  TextInput
} from 'react-native';

const GameDetailsScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const [players, setPlayers] = useState([]);
  const [gameCode, setGameCode] = useState('');
  const [gameId, setGameId] = useState('');
    const [userId, setUserId] = useState('');
    const [winner, setWinner] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  /* const players = [
    { name: 'Alice', avatarColor: '#FFFFFF', backgroundColor: '#FFEBEE', image: '🕹️' },
    { name: 'Bob', avatarColor: '#FFFFFF', backgroundColor: '#E8F5E9', image: '🧑‍🚀' },
    { name: 'Charlie', avatarColor: '#FFFFFF', backgroundColor: '#E3F2FD', image: '🤠' },
    { name: 'Diana', avatarColor: '#FFFFFF', backgroundColor: '#F3E5F5', image: '👽' },
  ];*/
  useEffect(() => {
    const { gameCode, gameId, userId } = route.params;
    setGameCode(gameCode);
    setGameId(gameId);
    setUserId(userId);
    // Fetch initial game data
    fetchGameData(gameCode);
    const subscription = supabase
    .channel(`game:${gameCode}`)
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'games', filter: `code=eq.${gameCode}` }, handleGameUpdate)
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);

    const fetchGameData = async (code: any) => {
      const { data, error } = await supabase
        .from('games')
        .select('game_state')
        .eq('code', code)
        .single();
  
      if (error) {
        console.error('Error fetching game data:', error);
      } else {
          setPlayers(data.game_state.players);
          setWinner(data.game_state.winner);

      }
    };
    const handleGameUpdate = (payload: { new: { game_state: { players: React.SetStateAction<never[]>, winner: React.SetStateAction<never[]>; }; }; }) => {
        setPlayers(payload.new.game_state.players);
        setWinner(payload.new.game_state.winner);

    };
    const handleShareCode = async () => {
          try {
            await Share.share({
                message: `Join me in the game! Use this code: ${gameCode}`,
            });
          } catch (error) {
            Alert.alert('Error', 'An error occurred while sharing the code.');
          }
    };

  const backToGameMode = () => {
      navigation.navigate('GameMode');
    };

  const handleStart = () => {
    navigation.navigate('gameboardscreen', {
      gameCode: gameCode,
      userId: userId
    });
  };
  return (
    <ImageBackground
      source={require('../../assets/background/22.png')} // Replace with your background image
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Player Squares */}
        <View style={styles.squaresContainer}>
          {players.map((player, index) => (
            <View
              key={player.id}
              style={[
                styles.playerSquare,
                index === 0 ? styles.topLeft : index === 1 ? styles.topRight : index === 2 ? styles.bottomLeft : styles.bottomRight,
                { backgroundColor:'#FFEBEE' }
              ]}
            >
              <Text style={styles.playerName}>{player.username}</Text>
              <Text style={styles.playerImage}>{player.icon}</Text>
            </View>
          ))        
          
          /*players.map((player, index) => (
            <View
              key={index}
              style={[
                styles.playerSquare,
                {
                  backgroundColor: player.backgroundColor,
                  ...(index === 0 && styles.topLeft),
                  ...(index === 1 && styles.topRight),
                  ...(index === 2 && styles.bottomLeft),
                  ...(index === 3 && styles.bottomRight),
                },
              ]}
            >
              <View style={[styles.avatar, { backgroundColor: player.avatarColor }]} />
              <Text style={styles.playerName}>{player.name}</Text>
              <Text style={styles.playerName}>{player.image}</Text>
            </View>
          ))*/}
        </View>

        {/* Instruction Icon */}
        <TouchableOpacity
          style={styles.instructionIcon}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.instructionText}>ℹ️</Text>
        </TouchableOpacity>

         {/* Enter Game Button */}
         {winner==null &&( < TouchableOpacity style={styles.button} onPress={handleStart}>
             <Text style={styles.buttonText}>Enter Game</Text>
         </TouchableOpacity>)}

         {winner == null && (<TouchableOpacity style={styles.sharebutton} onPress={handleShareCode}>
             <Text style={styles.buttonText}>Share</Text>
              </TouchableOpacity>)}

         {winner != null && (<TouchableOpacity style={styles.sharebutton} onPress={backToGameMode}>
                  <Text style={styles.buttonText}>Back to Game Mode</Text>
              </TouchableOpacity>)}

        {/* Modal for Instructions */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>How to Play</Text>
              <Text style={styles.modalText}>
                1. Each player takes turns to roll the dice.
                {'\n'}2. Follow the instructions on the game board.
                {'\n'}3. The first player to reach the finish line wins!
              </Text>
              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  squaresContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  playerSquare: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  topLeft: {
    top: 150,
    left: 80,
  },
  topRight: {
    top: 150,
    right: 80,
  },
  bottomLeft: {
    bottom: 300,
    left: 80,
  },
  bottomRight: {
    bottom: 300,
    right: 80,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 5,
  },
  playerName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    width: '50%',
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  sharebutton: {
    position: 'absolute',
    bottom: 110,
    width: '50%',
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playerImage: {
    fontSize: 24,
    marginBottom: 5,
  },
  instructionIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },
  instructionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default GameDetailsScreen;