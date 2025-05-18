import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GameBoard from '../screens/Play/gameboardscreen';
import Rank from '../screens/Play/Rank';
import GameDetailsScreen from '../screens/Play/GameDetailsScreen';
import Reward from '../screens/Play/Reward';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GameBoard" component={GameBoard} />
      {/* <Stack.Screen name="Rank" component={(Rank)} /> */}
      <Stack.Screen name="GameDetailsScreen" component={GameDetailsScreen} />
      <Stack.Screen name="Reward" component={Reward} />

    </Stack.Navigator>
  );
};

export default AppNavigator;
