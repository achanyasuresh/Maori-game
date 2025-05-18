// types/types.ts

export interface PlayerState {
    position: number;
    score: number;
    icon: string;
    color: string;
  }
  
  export interface GameState {
    players: { [key: string]: PlayerState };
    currentTurn: string;
    boardState: number[];
    lastRoll?: number;
  }
  
  export type RootStackParamList = {
    AddPlayers: undefined;
    InviteFriend: { playerIndex: number };
    GameDetailsScreen: { gameCode: string };
    gameboardscreen: { gameId: string };
  };
  
  export interface Player {
    name: string;
    avatarColor: string;
    backgroundColor: string;
    image: string;
  }
  
  export interface Game {
    id: string;
    code: string;
    status: 'waiting' | 'playing' | 'finished';
    created_at: string;
    game_state: GameState;
  }
  