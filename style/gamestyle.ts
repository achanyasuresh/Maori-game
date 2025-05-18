import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000',
  },
  playerImage: {
    width: 30,
    height: 30,
  },
  tokenContainer: {
    position: 'absolute',
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  token: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default styles;
