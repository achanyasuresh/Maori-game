import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';


declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Login: undefined; 
      LoginSelection: undefined; 
      LoginRegister: undefined; 
      HomePage: undefined; 
      GameMode: undefined; 
      Normal: undefined; 
      Timed: undefined; 
      SelectToken: undefined; 
      InviteFriends: undefined; 
      GameBoard: undefined; 
      Dictionary: undefined; 
      Rank: undefined; 
      Dice: undefined; 
      SwitchView: undefined; 
      Achievement: undefined; 
      Settings: undefined; 
      Help: undefined; 
      GameDetailsScreen: undefined;
      Reward: undefined;
      
    }

    interface NativeStackNavigationOptions {
     
    }

    interface BottomTabNavigationOptions {
     
    }
  }
}
