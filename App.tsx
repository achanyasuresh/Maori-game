import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginSelection from './screens/Login/LoginSelection/LoginSelection';
import SignIn from './screens/Login/LoginSelection/SignIn';
import RegisterScreen from './screens/Login/LoginSelection/RegisterScreen';
import KupuKupuLoading from './screens/Login/Loading';
import HomeScreen from './screens/Home/HomeScreen';
import AchievementScreen from './screens/Home/Achievement';
import SettingsScreen from './screens/Home/Settings';
import HelpScreen from './screens/Home/Help';
import GameBoardScreen from './screens/Play/gameboardscreen';
import GameMode from './screens/Play/GameMode';
import SelectTokenScreen from './screens/Play/SelectTokenScreen';
import AddPlayers from './screens/Play/AddPlayers';
import InviteFriend from './screens/Play/InviteFriend';
import GameSettings from './screens/Settings/GameSettings';
import AccountSettings from './screens/Settings/AccountSettings';
import ChangeUsername from './screens/Settings/ChangeUsername';
import ChangePassword from './screens/Settings/ChangePassword';
import Dictionary from './screens/Help/Dictionary';
import Rank from './screens/Play/Rank';
import GameDetailsScreen from './screens/Play/GameDetailsScreen';

import { ScoreProvider } from './context/scorecontext';
import { PlayerProvider } from './context/playercontext'; 

export type RootStackParamList = {
  Loading: undefined;
  LoginSelection: undefined;
  SignIn: undefined;
  Register: undefined;
  Home: undefined;
  GameMode: undefined;
  gameboardscreen: undefined;
  Achievement: undefined;
  Settings: undefined;
  GameSettings: undefined;
  AccountSettings: undefined;
  Help: undefined;
  Dictionary: undefined;
  ChangeUsername: undefined;
  ChangePassword: undefined;
  SelectTokenScreen: undefined;
  AddPlayers: { selectedToken: string };
  InviteFriend: undefined;
  Rank: undefined;
  GameDetailsScreen: undefined;
  
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <PlayerProvider>
        <ScoreProvider>
          <Stack.Navigator initialRouteName="Loading" >
            <Stack.Screen
              name="Loading"
              component={KupuKupuLoading}
              options={{ headerShown: false }}
            />
                      <Stack.Screen name="LoginSelection" component={LoginSelection} options={{ headerShown: false }} />
                      <Stack.Screen name="SignIn" component={SignIn} options={{ headerTitle: '' }} />
                      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                      <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: '' }} />
                      <Stack.Screen name="GameMode" component={GameMode} options={{ headerTitle: '' }} />
                      <Stack.Screen name="gameboardscreen" component={GameBoardScreen} options={{ headerTitle: '' }} />
                      <Stack.Screen name="Achievement" component={AchievementScreen} options={{ headerTitle: '' }} />
                      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerTitle: '' }} />
                      <Stack.Screen name="GameSettings" component={GameSettings} options={{ headerTitle: '' }} />
                      <Stack.Screen name="AccountSettings" component={AccountSettings} options={{ headerTitle: '' }} />
                      <Stack.Screen name="Help" component={HelpScreen} options={{ headerTitle: '' }} />
                      <Stack.Screen name="Dictionary" component={Dictionary} options={{ headerTitle: '' }} />
                      <Stack.Screen name="ChangeUsername" component={ChangeUsername} options={{ headerTitle: '' }} />
                      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerTitle: '' }} />
                      <Stack.Screen name="SelectTokenScreen" component={SelectTokenScreen} options={{ headerTitle: '' }} />
                      <Stack.Screen name="AddPlayers" component={AddPlayers} options={{ headerTitle: '' }} />
                      <Stack.Screen name="InviteFriend" component={InviteFriend} options={{ headerTitle: '' }} />
            {/* <Stack.Screen name="Rank" component={Rank} /> */}
                      <Stack.Screen name="GameDetailsScreen" component={GameDetailsScreen} options={{ headerTitle: '' }} />

          </Stack.Navigator>
        </ScoreProvider>
      </PlayerProvider>
    </NavigationContainer>
  );
}
