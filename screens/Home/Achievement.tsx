import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Modal, TouchableOpacity, Button, Alert } from 'react-native';
import ProfilePhoto from '../../assets/profile.png';
import { supabase } from '../../lib/supabase';
export default function AchievementScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null)
  const wrongWords = ['Hangi', 'Hīkoi', 'Whānau', 'Kai']; // Array of wrong words
  const playerData = {
    name: 'Alice',
    profilePhoto: ProfilePhoto,
    totalScore: 1200,
    achievements: ['Top Scorer of the Month','100 words spelled correctly'],
  };
  const showAllWords = () => {
    setIsModalVisible(true);
  };
  useEffect(() => {
  const fetchUserData = async () => {
    try {
      // Get the logged-in user's session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      console.log("data", sessionData)
      if (sessionError) {
        Alert.alert('Error', 'Unable to fetch user session.');
        return;
      }
      const userEmail = sessionData?.session?.user?.email ?? '';
      console.log("email", userEmail)
      const extractedName = userEmail.substring(0, 7);
        const formattedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
        setUserData({
          ...playerData,
          name: formattedName,
        });
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };
  fetchUserData();
}, []);
  return (
    <ImageBackground
      source={require('../../assets/background/22.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image source={playerData.profilePhoto} style={styles.profilePhoto} />
          <Text style={styles.playerName}>{userData?.name || 'Player'}</Text>
        </View>
        {/* Details Section */}
        <View style={styles.detailsSection}>
          <Text style={styles.scoreText}>Total Score: {playerData.totalScore}</Text>
          <Text style={styles.achievementsTitle}>Achievements:</Text>
          {playerData.achievements.map((achievement, index) => (
            <Text key={index} style={styles.achievementText}>
              - {achievement}
            </Text>
          ))}
          {/* Improvement Button */}
          <TouchableOpacity
            style={styles.improvementButton}
            onPress={showAllWords}
          >
            <Text style={styles.buttonText}>Improvement</Text>
          </TouchableOpacity>
        </View>
        {/* Modal for displaying all words */}
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Wrong Entered Words:</Text>
              {wrongWords.map((word, index) => (
                <Text key={index} style={styles.modalText}>
                  - {word}
                </Text>
              ))}
              <Button title="Close" onPress={() => setIsModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}
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
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: -230,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  playerName: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  detailsSection: {
    backgroundColor: 'rgba(20, 19, 19, 0.98)',
    padding: 50,
    borderRadius: 10,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  achievementsTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  achievementText: {
    fontSize: 16,
    color: '#fff',
  },
  improvementButton: {
    marginTop: 20,
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
});