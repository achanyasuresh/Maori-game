/*import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Button } from 'react-native';
import CounterButton from '../../component/counterbutton';
import { usePlayer } from '../../context/playercontext'; 


const AddPlayers: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  // const { selectedToken } = route.params;
  const { playerImages, setPlayerImages } = usePlayer();
  const [count, setCount] = useState(1);


  const handleImagePress = (index: number) => {
    navigation.navigate('InviteFriend', { 
      playerIndex: index,
      
    });
  };

  const updatePlayerImage = (updatedIndex: number, newImage: any) => {
    if (updatedIndex >= 0 && updatedIndex < playerImages.length) {
      const updatedImages = [...playerImages];
      updatedImages[updatedIndex] = newImage; 
      setPlayerImages(updatedImages);
    }
  };
  const displayedImages = playerImages.slice(0, count);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Players</Text>
      {/* <Text style={styles.tokenInfo}>Selected Token: {selectedToken}</Text> *//*}

      <CounterButton onChange={setCount} />

      <ScrollView 
        horizontal
        contentContainerStyle={styles.imagesContainer}
        showsHorizontalScrollIndicator={false}
      >
        {displayedImages.map((image, index) => (
          <TouchableOpacity 
            key={index}
            onPress={() => handleImagePress(index)}
            style={styles.imageWrapper}
          >
            <Image
              source={image}
              style={styles.playerImage}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>


      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('gameboardscreen')}
      >
        <Text style={styles.buttonText}>Play</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  tokenInfo: {
    fontSize: 18,
    marginBottom: 20,
  },
  imagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageWrapper: {
    marginHorizontal: 10,
  },
  playerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#000000',  
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20, 
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',  
  },
});

export default AddPlayers;
*/
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { supabase } from '../../lib/supabase';
import CounterButton from '../../component/counterbutton';
import { usePlayer } from '../../context/playercontext';

const AddPlayers: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const { playerImages, setPlayerImages } = usePlayer();
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleImagePress = async (index: number) => {
    try {
      const { data, error } = await supabase
        .from('player_images')
        .update({ selected: true })
        .eq('index', index);

      if (error) throw error;
      navigation.navigate('InviteFriend', { playerIndex: index });
    } catch (error) {
      Alert.alert('Error', 'Failed to update player image');
    }
  };

  const updatePlayerImage = async (updatedIndex: number, newImage: any) => {
    try {
      if (updatedIndex >= 0 && updatedIndex < playerImages.length) {
        const updatedImages = [...playerImages];
        updatedImages[updatedIndex] = newImage;
        
        const { error } = await supabase
          .from('player_images')
          .update({ image: newImage })
          .eq('index', updatedIndex);

        if (error) throw error;
        setPlayerImages(updatedImages);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update player image');
    }
  };

  const displayedImages = playerImages.slice(0, count);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Players</Text>
      <View style={styles.imagesContainer}>
        {displayedImages.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleImagePress(index)}
            style={styles.imageWrapper}
          >
            <Image source={image} style={styles.playerImage} />
          </TouchableOpacity>
        ))}
      </View>
      <CounterButton onChange={setCount} initialCount={count}
/>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('gameboardscreen')}
      >
        <Text style={styles.buttonText}>Play</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  imagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageWrapper: {
    marginHorizontal: 10,
  },
  playerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default AddPlayers;
