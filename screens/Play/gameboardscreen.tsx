import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert,
  Image,
} from 'react-native';

import { useNavigation, RouteProp } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';

type RootStackParamList = {
  gameboardscreen: { gameCode: string; gameId: string; userId: string };
};

type GameBoardScreenRouteProp = RouteProp<RootStackParamList, 'gameboardscreen'>;

const diceImages: { [key: number]: any } = {
  1: require('../../assets/d1.png'),
  2: require('../../assets/d2.png'),
  3: require('../../assets/d3.png'),
  4: require('../../assets/d4.png'),
  5: require('../../assets/d5.png'),
  6: require('../../assets/d6.png'),
};

const GameBoard: React.FC<{ route: GameBoardScreenRouteProp; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { gameCode, gameId, userId } = route.params;

  // Keep a separate state for the fetched game code from the DB, if needed.
  // This avoids overwriting the route param gameId on every render.
  const [dbGameCode, setDbGameCode] = useState<string | null>(null);

  const [diceValue, setDiceValue] = useState(1);
    const [isRolling, setIsRolling] = useState(false);
    const [isBtnEnable, setIsBtnEnable] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [currentCellLetter, setCurrentCellLetter] = useState('');
  const [isRewardVisible, setIsRewardVisible] = useState(false);
    const [timeCountdown, setCountdown] = useState(5);
    const [winner, setWinner] = useState(0);
  // We will use gameId directly from route.params to query Supabase instead of storing it in state
  // to avoid confusion with setGameCode.

  const gridSize = 6;

  async function fetchValidWords(word: string) {
    const { data, error } = await supabase
        .from('full_dictionary')
        .select('Maori, English').eq('Maori', word)
  
    if (error) {
      console.error('Error fetching words:', error)
      return []
      }

      return data.length > 0;
  }

  const boardLetters = [
    'A', 'E',  'H',  'I',  'O',  'NG',
    'P', '',   '',   '',   '',   'U',
    '?', '',   '',   '',   '',   '?',
    'K', '',   '',   '',   '',   'M',
    'N', '',   '',   '',   '',   '?',
    'P', 'R',  '?',  'T',  'W',  'A',
  ];

  const outerIndices = [
    // Active cells around the board
    0, 1, 2, 3, 4, 5,
    11, 17, 23, 29, 35,
    34, 33, 32, 31, 30,
    24, 18, 12, 6,
  ];

  const playerIcons = ['🕹️', '🧑', '🤠', '🚀'];
  const initialPlayerPositions = [
    0,                 // Top-left corner
   0,      // Top-right corner
    0,       // Bottom-left corner
    0,         // Bottom-right corner
  ];

  const [players, setPlayers] = useState([]);

  const [currentPlayer, setCurrentPlayer] = useState(0);

  const [playerAnims, setPlayerAnims] = useState([]);

  // Only set dbGameCode when the route param changes or when you fetch from Supabase
  useEffect(() => {
    if (gameCode) {
        setDbGameCode(gameCode);
        console.log("Game Code:", gameCode);
    }
  }, [gameCode]);

  useEffect(() => {
    if (isRolling) {
      const intervalId = setInterval(() => {
        setCountdown((prevTime) => {
          if (prevTime > 1) return prevTime - 1;
          clearInterval(intervalId);
          handleDiceClick(); // Automatically roll the dice when time is up
          return 5; // Reset timer for the next turn
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isRolling]);

    const fetchAndControlDice = async () => {
        try {
            const { data, error } = await supabase
                .from('dice')
                .select('*')
                .eq('game_code', gameCode)
                .single();

            if (error) {
                console.error('Error fetching dice state:', error);
                return;
            }
            if (data) {
                setDiceValue(data.value);
                setIsRolling(data.rolling);
            }
        } catch (err) {
            console.error('Error in fetchAndControlDice:', err);
        }
    }

    const fetchAndUpdateGameState = async (isUpdateBtn: boolean) => {
        fetchAndUpdateState(isUpdateBtn, true, true);
    }

    // Fetch the game state from Supabase
    const fetchAndUpdateState = async (isUpdateBtn: boolean, isRewardBtn: boolean, isWinnerBtn: boolean) => {
    try {
      const { data, error } = await supabase
        .from('games')
        .select('game_state')
        .eq('code', gameCode)
        .single();

      if (error) {
        console.error('Error fetching game state:', error);
        return;
      }

      if (data) {
        // Store the code from DB if needed

          const gameState = data.game_state;
          setCurrentPlayer(gameState.currentTurn);
          var playerAnimLocal = [];
          gameState.players.map((player, index) => {
              const row = Math.floor(player.position / gridSize);
              const col = player.position % gridSize;
              playerAnimLocal.push(new Animated.ValueXY({ x: col * 50, y: row * 50 }));
          });
          setPlayerAnims(playerAnimLocal);

          if (isUpdateBtn) {
              setIsBtnEnable(gameState.players[gameState.currentTurn].id == userId);
          }
          if (gameState.winner != null) {
              if (isWinnerBtn) {
                  setWinner(gameState.winner);
              }
              if (isRewardBtn) {
                  setIsRewardVisible(true);
              }  
          }
          
        setPlayers(
          gameState.players.map((player: any) => ({
            ...player,
            position: player.position,
            icon: player.icon,
              points: player.points,
          }))
        );

      }
    } catch (err) {
      console.error('Error in fetchAndUpdateGameState:', err);
    }
  };

  useEffect(() => {
    // Subscribe to all changes on the 'games' table in the 'public' schema
    const channel = supabase
      .channel('games-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'games' },
        payload => {
          // When any row changes in 'games', refetch to get the latest state
          if (payload) {
            fetchAndUpdateGameState(true);
          }
        }
    ).subscribe();

      supabase
          .channel('dice-changes')
          .on(
              'postgres_changes',
              { event: '*', schema: 'public', table: 'dice' },
              payload => {
                  // When any row changes in 'games', refetch to get the latest state
                  if (payload) {
                      fetchAndControlDice();
                  }
              }
      ).subscribe();

      fetchAndUpdateGameState(true);

    // Cleanup: remove the channel when the component unmounts
    return () => {
        //supabase.removeChannel(channel);
        supabase.removeAllChannels();
    };
  }, [gameCode]);

    const updateDiceStatus = async (isRolling: boolean, value: number) => {
        await supabase
            .from('dice')
            .update({
                rolling: isRolling,
                value: value
            })
            .eq('game_code', gameCode);
    }

  const handleDiceClick = () => {
    if (!isRolling) {
        setIsRolling(true); // Start the rolling animation
        updateDiceStatus(true,0)
      const randomDelay = Math.floor(Math.random() * 3000) + 1000; // 1 to 4 seconds
      const randomValue = Math.floor(Math.random() * 6) + 1;

        setTimeout(() => {
            updateDiceStatus(false, randomValue);
        setDiceValue(randomValue);
        setIsRolling(false); // Stop the rolling animation
        movePlayer(randomValue); // Move the player based on the rolled value
      }, randomDelay);
    }
  };

  const movePlayer = async (steps: number) => {
    const currentIndex = outerIndices.indexOf(players[currentPlayer].position);
    const newIndex = (currentIndex + steps) % outerIndices.length;
    const newPosition = outerIndices[newIndex];

    setTimeout(async () => {
      const row = Math.floor(newPosition / gridSize);
      const col = newPosition % gridSize;

      // Prepare updated players
      const updatedPlayers = players.map((player, index) =>
        index === currentPlayer ? { ...player, position: newPosition } : player
      );

      try {
        const { data, error } = await supabase
          .from('games')
          .update({
            game_state: {
              players: updatedPlayers,
              currentTurn: currentPlayer % players.length,
              winner: null,
            },
          })
          .eq('code', gameCode);

        if (error) {
          console.error('Error updating game state:', error);
        } else {
          // Re-fetch updated state
          fetchAndUpdateGameState(false);
        }
      } catch (err) {
        console.error('Error in movePlayer:', err);
      }

      // Update local state for animation
      setPlayers((prevPlayers) => {
        const updatedList = [...prevPlayers];
        updatedList[currentPlayer].position = newPosition;
        return updatedList;
      });

      Animated.timing(playerAnims[currentPlayer], {
        toValue: { x: col * 50, y: row * 50 },
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        // Delay before showing the word popup
        setTimeout(() => {
          let cellLetter = boardLetters[newPosition] || '';
          if (cellLetter === '?') cellLetter = 'NG'; // Handle special case
          setCurrentCellLetter(cellLetter);
          setCurrentWord('');
          setIsPopupVisible(true);
        }, 1000);
      });
    }, 1000);
  };

  const handleWordSubmit = async () => {
    const lowerCaseWord = currentWord.toLowerCase();
    const lowerCaseCellLetter = currentCellLetter.toLowerCase();
      var isCorrect = false;
      if (lowerCaseWord.startsWith(lowerCaseCellLetter)) {
          var checkResult = await fetchValidWords(lowerCaseWord)
          if (checkResult) {
              isCorrect = true;
          } else {
              Alert.alert('Incorrect', 'The word does not match any valid entries.');
          }

      } else {
          Alert.alert('Invalid Word', `The word must start with the letter "${currentCellLetter}".`);
      }
      try {
          console.log("currentPlayer:", currentPlayer);
          const updatedPlayers = players.map((player, index) =>
              index === currentPlayer ? { ...player, points: player.points + (isCorrect ? 10 : 0) } : player
          );
          var isWin = false;
          if (updatedPlayers[currentPlayer].points >= 20) {
              setWinner(currentPlayer);
              setIsRewardVisible(true); // Show reward modal
              isWin = true;
          }
          if (isCorrect && !isWin) {
              Alert.alert('Correct!', 'You earned 10 points!');
          }
          const { data, error } = await supabase
              .from('games')
              .update({
                  game_state: {
                      players: updatedPlayers,
                      currentTurn: (currentPlayer + 1) % players.length,
                      winner: isWin ? currentPlayer: null,
                  },
              })
              .eq('code', gameCode);

          if (error) {
              console.error('Error updating game state:', gameCode);
          }
      } catch (err) {
          console.error('Error in handleWordSubmit:', err);
      }
    fetchAndUpdateState(true,false, false);
    setCurrentWord('');
    setIsPopupVisible(false);
    setIsRolling(false);
    };

    const handleCloseReward = async () => {
        setIsRewardVisible(false);
        navigation.navigate('GameDetailsScreen', {
            gameCode: gameCode,
            gameId: gameId,
            userId: userId
        });
    }


  const isOuterCell = (rowIndex: number, colIndex: number) => {
    return (
      rowIndex === 0 ||
      rowIndex === gridSize - 1 ||
      colIndex === 0 ||
      colIndex === gridSize - 1
    );
  };

    return (
    <View style={styles.container}>
      {/* Dictionary Button */}
      <TouchableOpacity
        style={[styles.icon, styles.dictionaryIcon]}
        onPress={() => navigation.navigate('Dictionary')}
      >
        <Image
          source={require('../../assets/Dictionary.png')}
          style={{ width: 60, height: 60 }}
        />
      </TouchableOpacity>

      {/* Settings Button */}
      <TouchableOpacity
        style={[styles.icon, styles.settingsIcon]}
        onPress={() => navigation.navigate('Settings')}
      >
        <Image
          source={require('../../assets/Settings.png')}
          style={styles.settingsImage}
        />
      </TouchableOpacity>

      {/* Scores */}
      <View style={styles.scoresContainer}>
        {players.map((player, index) => (
          <Text key={index} style={styles.scoreText}>
            {player.icon}: {player.points} pts
          </Text>
        ))}
      </View>

      {/* Board */}
      <View style={styles.board}>
        {Array.from({ length: gridSize }).map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {Array.from({ length: gridSize }).map((_, colIndex) => {
              if (!isOuterCell(rowIndex, colIndex)) {
                // Return an empty cell if it's not on the outer boundary
                return (
                  <View key={`${rowIndex}-${colIndex}`} style={styles.emptyCell} />
                );
              }

              const tileIndex = rowIndex * gridSize + colIndex;
              const tileLetter = boardLetters[tileIndex] || '';

              return (
                <View key={tileIndex} style={[styles.cell, styles.normalTile]}>
                  <Text style={styles.cellText}>{tileLetter}</Text>
                </View>
              );
            })}
          </View>
        ))}

        {players.map((player, index) => {
          const animStyle = {
            transform: playerAnims[index].getTranslateTransform(),
          };
          return (
            <Animated.View key={index} style={[styles.playerToken, animStyle]}>
              <Text style={styles.playerEmoji}>{player.icon}</Text>
            </Animated.View>
          );
        })}
      </View>

      {/* Dice and Rolling */}
      <View style={styles.diceContainer}>
              {isRolling ? (
                  <Image source={require('../../assets/dice.gif')} style={styles.gif} />
              ) : (!isPopupVisible && (<TouchableOpacity style={styles.diceButton} onPress={handleDiceClick} disabled={!isBtnEnable}>
                  <Text style={styles.diceButtonText}> {isBtnEnable ? "Please roll the dice..." : "It is your friend's turn"}</Text>
              </TouchableOpacity>
              ))}
        <Text style={styles.diceValue}>Dice Value: {diceValue}</Text>
      </View>

      {/* Warning message */}
      {false && (
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>Please roll the dice!</Text>
        </View>
      )}

      {/* Countdown Timer */}
      {false && (
        <View style={styles.timeContainer}>
          {timeCountdown === 0 ? (
            <Text style={styles.countdownText}>Time up!</Text>
          ) : (
            <Text style={styles.countdownText}>
              Time left: {timeCountdown}s
            </Text>
          )}
        </View>
      )}

          {/* Popup for entering a word */}
          <Modal visible={isPopupVisible || isRewardVisible} transparent animationType="fade">
              {isPopupVisible && (< View style={styles.popupContainer}>
                  <View style={styles.popup}>
                      <Text style={styles.popupText}>
                          Enter a word with the letter: <Text style={styles.highlight}>{currentCellLetter}</Text>
                      </Text>
                      <TextInput
                          style={styles.input}
                          value={currentWord}
                          onChangeText={(text) => setCurrentWord(text)}
                      />
                      <Button title="Submit" onPress={handleWordSubmit} />
                  </View>
              </View>)}
              {/* Reward Popup */}
              {isRewardVisible && (< View style={styles.rewardContainer}>
                  <View style={styles.rewardPopup}>
                      <Text style={styles.rewardText}>🎉 Congratulations! 🎉</Text>
                      <Text style={styles.rewardScore}>
                          The winner is {players.length > 0 ? players[winner].icon : 'No one'}!
                      </Text>)
                      {players.map((player, index) => (
                          <Text key={index} style={styles.rewardScore}>
                              {player.icon}: {player.points} pts
                          </Text>
                      ))}
                      <Button title="Back to Game Lobby" onPress={handleCloseReward} />
                  </View>
              </View>)}
          </Modal>
            </View>
  );
};

const styles = StyleSheet.create({
  dictionaryIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 100,
    height: 100,
  },
  settingsIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  settingsImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  headerContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 1,
  },
  icon: {
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gif: {
    marginTop: -200,
    width: 80,
    height: 80,
  },
  result: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D8CCB7',
  },
  board: {
    width: 300,
    height: 300,
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4b3621',
  },
  normalTile: {
    backgroundColor: '#ffffff',
  },
  startTile: {
    backgroundColor: '#FFD700',
  },
  cellText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4b3621',
  },
  emptyCell: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
  },
  playerToken: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.7)',
    borderRadius: 25,
  },
  playerEmoji: {
    fontSize: 30,
  },
  diceContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  diceButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#574240',
  },
  diceButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  diceValue: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  popupText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#4b3621',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#ff4500',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  scoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b3621',
  },
  rewardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  rewardPopup: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  rewardText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rewardScore: {
    fontSize: 18,
    marginBottom: 10,
  },
  warningContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  warningText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  countdownText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#4b3621',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    marginBottom: 20,
  },
});

export default GameBoard;
