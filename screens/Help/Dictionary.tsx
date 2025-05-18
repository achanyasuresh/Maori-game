import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, Button } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types'; 
import dictionaryData from '../../dictionaryData.json';

interface DictionaryEntry {
  word: string;
  definition: string;
}

const dictionaryEntries: DictionaryEntry[] = [
  ...dictionaryData,

    { word: 'RUKU', definition: 'Dive' },
    { word: 'WHAKAPONO', definition: 'Believe'},
    { word: 'URU', definition: 'Enter' },
    { word: 'NEKE', definition: 'Move' },
    { word: 'PANUI', definition: 'Narrate' },
    { word: 'AWHI', definition: 'Hug' },
    { word: 'OHO', definition: 'Wake up' },
    { word: 'EKE', definition: 'Climb' },
    { word: 'INE', definition: 'Measure' },
    { word: 'WAIATA', definition: 'Sing' },
    { word: 'TOHATOHA', definition: 'Spreadout' },
    { word: 'HAPARANGI', definition: 'Shout' },
    { word: 'KAUHOE', definition: 'Swim' },
    { word: 'KAITIAKI', definition: 'Rub' },
    { word: 'HEMO', definition: 'Pass by' },
    { word: 'HIKOI', definition: 'Step' },
    { word: 'NGAHURU', definition: 'Autumn' },
    { word: 'UARUA', definition: 'raincoat' },
    { word: 'HAKIHEA', definition: 'December' },
    { word: 'INGARANGI', definition: 'England' },
    { word: 'MAEHE', definition: 'March' },
    { word: 'MANE', definition: 'Monday' },
    { word: 'MAORI', definition: 'Indigenous' },
    { word: 'OKETOPA', definition: 'October' },
    { word: 'PIPIRI', definition: 'June' },
    { word: 'RATAPU', definition: 'Sunday' },
];

const Dictionary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWords, setFilteredWords] = useState<DictionaryEntry[]>(dictionaryEntries);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWord, setSelectedWord] = useState<DictionaryEntry | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const result = dictionaryEntries.filter(entry =>
      entry.word.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => a.word.localeCompare(b.word));;
    setFilteredWords(result);
  }, [searchQuery]);


  const createRows = (items: DictionaryEntry[], columns: number) => {
    const rows = [];
    for (let i = 0; i < items.length; i += columns) {
      rows.push(items.slice(i, i + columns));
    }
    return rows;
  };

  const rows = createRows(filteredWords, 4); 

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a word..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />

      <TouchableOpacity
        style={styles.settingsIcon} 
        onPress={() => navigation.navigate('Settings')} 
      >
        <Image
          source={require('../../assets/Settings.png')} 
          style={styles.settingsImage}
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedWord && (
              <>
                <Image
                  source={require('../../assets/Fire.png')} 
                  style={styles.modalIcon}
                />
                <Text style={[styles.modalText, styles.boldText]}>{selectedWord.word}</Text>
                <Text style={[styles.modalText, styles.boldText]}>English: {selectedWord.definition}</Text>
                <Text style={[styles.modalText, styles.boldText]}>Description ....................</Text>
                <Text style={[styles.modalText, styles.boldText]}>Example Sentence ...................</Text>
              </>
            )}
            <Button title="Close" onPress={() => setModalVisible(false)} color="black"/>
          </View>
        </View>
      </Modal>

      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item, itemIndex) => (
            <View key={itemIndex} style={styles.item}>
              <TouchableOpacity 
                onPress={() => {
                  if (item.word === "AHI") {
                    setSelectedWord(item);
                    setModalVisible(true);
                  }
                }}
              >
                <Text style={styles.word}>{item.word}</Text>
              </TouchableOpacity>
              <Text style={styles.definition}>{item.definition}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 40,
      backgroundColor: '#fff',
    },
    searchInput: {
      height: 40,
      borderColor: '#ddd',
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 8,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',  
      marginBottom: 16,
    },
    item: {
      flex: 1,
      marginHorizontal: 8,
      alignItems: 'center', 
    },
    word: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center', 
    },
    definition: {
      fontSize: 16,
      textAlign: 'center', 
    },
    settingsIcon: {
      position: 'absolute',
      top: 0,  
      right: 10, 
    },
    settingsImage: {
      width: 30, 
      height: 30, 
      resizeMode: 'contain',
    },
    backbutton: {
      position: 'absolute',
      top: 0,  
      left: 10, 
      zIndex: 1,
    },
    backImage: {
      width: 30, 
      height: 30, 
      resizeMode: 'contain',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
     },
    modalContent: {
      width: 300,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 18,
      marginBottom: 15,
    },
    modalIcon: {
      width: 40, 
      height: 40, 
      marginBottom: 15, 
    },
    boldText: {
      fontWeight: 'bold',
    },
});

export default Dictionary;
