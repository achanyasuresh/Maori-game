import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Share, ImageBackground } from 'react-native';
import { usePlayer } from '../../context/playercontext';
import { supabase } from '../../lib/supabase';
import { PlayerContext } from '../../context/playercontext';


const InviteFriend: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { setPlayerImages } = usePlayer();
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [codeInputs, setCodeInputs] = useState<string[]>(Array(6).fill(''));
  const [activeTab, setActiveTab] = useState<'JOIN' | 'CREATE'>('JOIN');
    const icons = ['🕹️', '🧑‍🚀', '🤠', '👽'];
    const { currentPlayerName, setCurrentPlayerName } = useContext(PlayerContext);
    const inputRefs = useRef([]);


    useEffect(() => {
        // Set up refs for each input.  Important for focusing.
        inputRefs.current = inputRefs.current.slice(0, codeInputs.length);
    }, [codeInputs]);

  async function handleCreateCode() {
    try {
      const code = generateUniqueCode();
      const playerIcon = getRandomIcon();
      const gameState = {
          players: [{
              id: generatePlayerId(),
              gameplayerid: 0,
              username: generatePlayerId(),
          position: 0,
          points: 0,
          icon: playerIcon
        }],
        currentTurn: 0,
        winner: null
      };
      setGeneratedCode(code);

      const { data, error } = await supabase
        .from('games')
        .insert({
          code,
          game_state: gameState,
          status: 'waiting'
        })
        .select()
        .single();
  
        if (error) throw error;

        const { data1, error1 } = await supabase
            .from('dice')
            .insert({
                game_code: code,
                rolling: false,
                value: 0
            })
            .select()
            .single();
        if (error1) throw error1;

      // Navigate to GameDetailsScreen with game ID and user ID
      navigation.navigate('GameDetailsScreen', {
      gameCode: code,
      gameId: data.id,
      userId: gameState.players[0].id
    });
  
    
    } catch (error) {
      console.error('Error creating game:', error);
      // Handle error (e.g., show error message to user)
    }
  }
  
  function generateUniqueCode() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit number
  }
  
  function generatePlayerId() {
      //  return Math.random().toString(36).substring(2, 15);
      return currentPlayerName;
  }
  
  function getRandomIcon() {
    return icons[Math.floor(Math.random() * icons.length)];
  }
  

  const handleShareCode = async () => {
    if (generatedCode) {
      try {
        await Share.share({
          message: `Join me in the game! Use this code: ${generatedCode}`,
        });
      } catch (error) {
        Alert.alert('Error', 'An error occurred while sharing the code.');
      }
    }
    };


  const handleCodeInputChange = async (text: string, index: number) => {
    const newInputs = [...codeInputs];
    newInputs[index] = text;
      setCodeInputs(newInputs);

      if (text.length === 1 && index < codeInputs.length - 1) {
          inputRefs.current[index + 1].focus();
      } else if (text.length === 0 && index > 0) { // Handle backspace
          inputRefs.current[index - 1].focus();
      }
  
    if (newInputs.every((char) => char !== '')) {
      const code = newInputs.join('');
      try {
        const { data: game, error } = await supabase
          .from('games')
          .select('*')
          .eq('code', code)
          .single();
  
        if (error) throw error;
        if (!game) {
          Alert.alert('Error', 'Game not found');
          return;
        }
  
        const playerIcon = icons.find(icon => !game.game_state.players.some((p: { icon: string; }) => p.icon === icon));
        if (!playerIcon) {
          Alert.alert('Error', 'Game is full');
          return;
        }
  
        const newPlayer = {
          id: generatePlayerId(),
          username: generatePlayerId(), // You might want to use a real username input
          position: 0,
          points: 0,
          icon: playerIcon
        };
  
        const updatedGameState = {
          ...game.game_state,
          players: [...game.game_state.players, newPlayer]
        };
  
        const { data: updatedGame, error: updateError } = await supabase
          .from('games')
          .update({ game_state: updatedGameState })
          .eq('id', game.id)
          .select()
          .single();
  
        if (updateError) throw updateError;
  
        // Navigate to the game screen with the updated game data
        navigation.navigate('GameDetailsScreen', {
          gameCode: code,
          gameId: updatedGame.id,
          userId: newPlayer.id
        });
      } catch (error) {
        console.error('Error joining game:', error);
        Alert.alert('Error', 'Failed to join the game. Please try again.');
      }
    }
  };

  const handleStart = () => {
    if (generatedCode) {
      navigation.navigate('GameDetailsScreen', { gameCode: generatedCode }); // Pass the code as a parameter
    } else {
      Alert.alert('No Code', 'Please generate a code before proceeding.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background/22.png')} // Adjust path as needed
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Invite Friends</Text>

        {/* Tabs for Create and Join */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'JOIN' && styles.activeTab]}
            onPress={() => setActiveTab('JOIN')}
          >
            <Text style={[styles.tabText, activeTab === 'JOIN' && styles.activeTabText]}>JOIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'CREATE' && styles.activeTab]}
            onPress={() => setActiveTab('CREATE')}
          >
            <Text style={[styles.tabText, activeTab === 'CREATE' && styles.activeTabText]}>CREATE</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'CREATE' && (
          <View>
            {generatedCode && (
              <View style={styles.codeContainer}>
                {generatedCode.split('').map((digit, index) => (
                  <View key={index} style={styles.codeBox}>
                    <Text style={styles.codeText}>{digit}</Text>
                  </View>
                ))}
              </View>
            )}

            <TouchableOpacity
              style={styles.shareButton}
              onPress={generatedCode ? handleShareCode : handleCreateCode}
            >
              <Text style={styles.buttonText}>{generatedCode ? 'SHARE' : 'CREATE'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.startButton} onPress={handleStart}>
              <Text style={styles.buttonText}>NEXT</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'JOIN' && (
          <View style={styles.inputContainer}>
            {codeInputs.map((value, index) => (
              <TextInput
                key={index}
                style={styles.codeInput}
                value={value}
                maxLength={1}
                keyboardType="numeric"
                    onChangeText={(text) => handleCodeInputChange(text, index)}

                    ref={(el) => (inputRefs.current[index] = el)} // Assign refs
                    // Add blurOnSubmit to prevent the keyboard from dismissing on last input
                    blurOnSubmit={index === codeInputs.length - 1}
              />
            ))}
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:-200,
    color:'#fff'
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  activeTab: {
    borderColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: 'gray',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  codeBox: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  codeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  codeInput: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#FFF',
  },
  shareButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  startButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default InviteFriend;